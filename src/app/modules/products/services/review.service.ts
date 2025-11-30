import { Injectable } from '@angular/core';
import { ApiUtilService } from '@utils/api-util.service';
import { Observable } from 'rxjs';
import {
  IReviewCreateRequest,
  IReviewCreateResponse,
  IReviewGetByProductParam,
  IReviewGetByProductResponse,
} from '../models/review.model';
import { REVIEW_API_ROUTES } from './review-api.routing';

@Injectable({
  providedIn: 'root',
})
export class ReviewService extends ApiUtilService {
  getByProduct(value: {
    param: IReviewGetByProductParam;
  }): Observable<IReviewGetByProductResponse> {
    const url = this.buildApiUrl({
      endpoint: REVIEW_API_ROUTES.getByProduct,
      parameters: { productId: value.param.productId },
    });
    return this.http.get<IReviewGetByProductResponse>(url);
  }

  createReview(value: {
    body: IReviewCreateRequest;
  }): Observable<IReviewCreateResponse> {
    const url = this.buildApiUrl({
      endpoint: REVIEW_API_ROUTES.create,
    });
    return this.http.post<IReviewCreateResponse>(url, value.body);
  }
}
