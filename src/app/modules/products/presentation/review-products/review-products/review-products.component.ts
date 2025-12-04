import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { IReview } from '../../../models/review.model';
import { ReviewService } from '../../../services/review.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { ToastStateService } from '../../../../../shared/services/toast.service';

@Component({
  selector: 'app-review-products',
  imports: [DialogModule, ButtonModule, SkeletonModule, RatingModule, FormsModule],
  templateUrl: './review-products.component.html',
  styleUrl: './review-products.component.css'
})
export class ReviewProductsComponent implements OnChanges {
  @Input() productId: number | null = null;
  @Input() productName: string | undefined;
  @Input() visible: boolean = false;
  @Input() canReview: boolean = false;
  @Input() showEditPreview: boolean = true;
  @Output() close = new EventEmitter<void>();

  reviews = signal<IReview[]>([]);
  loading = signal<boolean>(false);
  submitting = signal<boolean>(false);
  newComment = '';
  newStars: number = 0;
  showForm = signal<boolean>(false);
  permissionNotice = signal<boolean>(false);

  private readonly _router = inject(Router);
  private readonly _toastState = inject(ToastStateService);

  constructor(private readonly _reviewService: ReviewService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['visible'] || changes['productId']) && this.visible) {
      this.resetFormState();
      this.loadReviews();
    }
  }

  loadReviews() {
    if (!this.productId) return;
    this.loading.set(true);
    this._reviewService
      .getByProduct({ param: { productId: this.productId } })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.reviews.set(response.data);
          }
        },
      });
  }

  startReview() {
    if (this.canReview) {
      this.permissionNotice.set(false);
      this.showForm.set(true);
    } else {
      this.handleAuthRequired();
    }
  }

  submitReview() {
    const comment = this.newComment.trim();
    const stars = this.newStars;
    if (!this.productId || !comment || !stars || this.submitting()) return;

    this.submitting.set(true);
    this._reviewService
      .createReview({ body: { productId: this.productId, comment, stars } })
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: (response) => {
          if (response.success) {
            // Show newest first
            this.reviews.update((current) => [{ comment, stars }, ...current]);
            this.newComment = '';
            this.newStars = 0;
            this.showForm.set(false);
          }
        },
        error: (error) => {
          if (error?.status === 400 || error?.status === 401) {
            this.handleAuthRequired();
            return;
          }
          this.permissionNotice.set(true);
        },
      });
  }

  onHide() {
    this.close.emit();
  }

  onVisibleChange(visible: boolean) {
    // Ensure parent gets notified when dialog is closed via the built-in X button
    if (!visible) {
      this.onHide();
    }
  }

  private resetFormState() {
    this.showForm.set(false);
    this.permissionNotice.set(false);
    this.newComment = '';
    this.newStars = 0;
  }

  private handleAuthRequired() {
    this.permissionNotice.set(true);
    this._toastState.setToast({
      severity: 'warn',
      summary: 'Inicia sesión',
      detail: 'Para comentar debes iniciar sesión.',
      life: 3000,
    });
    this._router.navigate(['/auth']);
  }
}
