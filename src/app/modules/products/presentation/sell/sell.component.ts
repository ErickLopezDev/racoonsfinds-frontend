import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputText } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { Textarea } from 'primeng/textarea';
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { ICategory } from '../../../categories/models/categories.model';
import { CategoriesService } from '../../../categories/services/categories.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { IProductCreateRequest } from '../../models/products.model';
import { ToastStateService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-sell',
  imports: [CommonModule, TabsModule, CardModule, Breadcrumb, IftaLabelModule, InputText, InputNumberModule, Textarea, Select, ButtonModule, CarouselModule, ReactiveFormsModule],
  templateUrl: './sell.component.html',
  styleUrl: './sell.component.css'
})
export class SellComponent implements OnInit {

  // Services
  private readonly _categoryService: CategoriesService = inject(CategoriesService);
  private readonly _productService = inject(ProductService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _toast = inject(ToastStateService);

  // Variables
  categories = signal<ICategory[]>([]);
  items: MenuItem[] = [
    { label: 'Vender', icon: 'pi pi-pen-to-square' },
  ];
  srcIndex: number = 0
  imagesShowArray: any = [{
    image: 'assets/image-not-found.svg',
    name: 'Imagen por defecto'
  }]
  imagesArray: FileList | null = null
  updateUpload: boolean = true
  form: FormGroup = this._formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    price_input: ['', [Validators.required, Validators.min(1)]],
    quantity: ['', [Validators.required, Validators.min(1)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    category: ['', [Validators.required]],
  });
  productId: number | null = null;

  ngOnInit() {
    this._categoryService.getAll().subscribe({
      next: (categories) => {
        if (categories.success) {
          this.categories.set(categories.data);
        }
      }
    });
    // Obtener y validar parámetro 'id' como número seguro
    const idParam = this._activatedRoute.snapshot.paramMap.get('id');
    if (typeof idParam === 'string' && idParam.trim() !== '') {
      const parsed = Number(idParam);
      // validar que es un número finito
      if (Number.isFinite(parsed)) {
        // opcional: forzar entero si corresponde a IDs
        this.productId = Math.trunc(parsed);

        this._productService.getById({ body: { id: this.productId } }).subscribe({
          next: (res) => {
            if (res.success) {
              const product = res.data;
              this.form.patchValue({
                name: product.name,
                price_input: product.price,
                quantity: product.stock,
                description: product.description,
                category: product.categoryId,
              });
              this.imagesShowArray = [{
                image: product.imageUrl,
                name: product.name
              }];
            }
          }
        })

      } else {
        this.productId = null;
      }
    } else {
      this.productId = null;
    }
  }

  saveProduct(): void {
    if (!this.imagesArray) return;
    if (this.form.invalid || this.imagesArray.length == 0) return;
    if (this.productId) {
      this.updateProduct();
    } else {
      this.createProduct();
    }

  }

  createProduct(): void {

    if (!this.imagesArray) return;

    const req: IProductCreateRequest = {
      name: this.form.get('name')?.value,
      price: this.form.get('price_input')?.value,
      stock: this.form.get('quantity')?.value,
      description: this.form.get('description')?.value,
      categoryId: this.form.get('category')?.value,
      file: this.imagesArray[0]
    }

    this._productService.create({ body: req }).subscribe({
      next: (res) => {
        if (res.success) {
          this._router.navigate(['/dash/products']);
          this._toast.setToast({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Producto creado correctamente',
            life: 3000
          });
        }
      }
    });

  }

  updateProduct(): void {
    if (!this.imagesArray || !this.productId) return;
    
  }

  uploadimage(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    const images = input?.files;

    if (images && images.length > 0 && images.length < 5) {
      this.imagesShowArray = []
      this.srcIndex = 0
      this.updateUpload = true
      this.imagesArray = images

      // Array temporal para almacenar las imágenes procesadas
        let processedImages: any[] = []
        let processedCount = 0

        for (const file of Array.from(images)) {
          const reader = new FileReader();
          reader.readAsDataURL(file)
          reader.onload = (event: any) => {
            processedImages.push({
              image: event.target.result,
            name: file.name
          });
          processedCount++

          // Cuando todas las imágenes estén procesadas, actualizar el array
          if (processedCount === images.length) {
            this.imagesShowArray = processedImages
          }
        }
      }
    } else {
      this.updateUpload = true
      this.imagesShowArray = [{
        image: 'assets/image-not-found.svg',
        name: 'Imagen por defecto'
      }]
      this.imagesArray = null
      this.srcIndex = 0
    }
  }

  deleteImage(): void {
    this.updateUpload = true
    this.imagesShowArray = [{
      image: 'assets/image-not-found.svg',
      name: 'Imagen por defecto'
    }]
    this.imagesArray = null
    this.srcIndex = 0
  }

}
