import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../products/services/product.service';
import { IProduct } from '../../../products/models/products.model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  private readonly _productService = inject(ProductService);

  featuredProducts = signal<IProduct[]>([]);
  loadingFeatured = signal<boolean>(false);
  readonly skeletonCards = Array.from({ length: 6 });

  ngOnInit() {
    this.loadFeaturedProducts();
  }

  private loadFeaturedProducts() {
    this.loadingFeatured.set(true);

    this._productService
      .getAll({ query: { page: 0, size: 6 } })
      .pipe(finalize(() => this.loadingFeatured.set(false)))
      .subscribe({
        next: (response) => {
          const products = response?.data?.content ?? [];
          const visibleProducts = products.filter((product) => !product.eliminado);
          this.featuredProducts.set(visibleProducts.slice(0, 6));
        },
        error: () => {
          this.featuredProducts.set([]);
        },
      });
  }
}
