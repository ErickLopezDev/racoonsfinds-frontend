import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { Skeleton } from 'primeng/skeleton';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { IReview } from '../../../models/review.model';
import { ReviewService } from '../../../services/review.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-review-products',
  imports: [DialogModule, Button, Skeleton, RatingModule, FormsModule],
  templateUrl: './review-products.component.html',
  styleUrl: './review-products.component.css'
})
export class ReviewProductsComponent implements OnChanges {
  @Input() productId: number | null = null;
  @Input() productName: string | undefined;
  @Input() visible: boolean = false;
  @Input() canReview: boolean = false;
  @Output() close = new EventEmitter<void>();

  reviews = signal<IReview[]>([]);
  loading = signal<boolean>(false);
  submitting = signal<boolean>(false);
  newComment = '';
  newStars: number = 0;
  showForm = signal<boolean>(false);
  permissionNotice = signal<boolean>(false);

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
      this.permissionNotice.set(true);
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
}
