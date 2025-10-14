import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-sell',
  imports: [CommonModule, TabsModule, CardModule, Breadcrumb, IftaLabelModule, InputText, InputNumberModule, Textarea, Select, ButtonModule, CarouselModule],
  templateUrl: './sell.component.html',
  styleUrl: './sell.component.css'
})
export class SellComponent implements OnInit {
  cities: any[] | undefined;

  selectedCity: any | undefined;
  public srcIndex: number = 0
  public imagesArray: any = [{
    image: 'assets/image-not-found.svg',
    name: 'Imagen por defecto'
  }]
  public updateUpload: boolean = true


  test(product: any): void {
    console.log(product)
  }

  uploadimage(e: any): void {
    let images = e.target.files

    if (images.length > 0 && images.length < 5) {
      this.imagesArray = []
      this.srcIndex = 0
      this.updateUpload = true
      
      // Array temporal para almacenar las imágenes procesadas
      let processedImages: any[] = []
      let processedCount = 0
      
      for (let i = 0; i < images.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(images[i])
        reader.onload = (event: any) => {
          processedImages.push({
            image: event.target.result,
            name: images[i].name
          });
          processedCount++
          
          // Cuando todas las imágenes estén procesadas, actualizar el array
          if (processedCount === images.length) {
            this.imagesArray = processedImages
          }
        }
      }
    }
  }

  deleteImage(): void {
    this.updateUpload = true
    this.imagesArray = [{
      image: 'assets/image-not-found.svg',
      name: 'Imagen por defecto'
    }]
    this.srcIndex = 0
  }

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }
  items: MenuItem[] = [
    { label: 'Vender', icon: 'pi pi-pen-to-square' },
  ];
}
