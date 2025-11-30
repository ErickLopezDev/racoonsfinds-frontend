import { IApiResponse } from '@utils/api-util';

export interface IReview {
  comment: string;
  stars?: number | null;
}

export interface IReviewCreateRequest {
  productId: number;
  stars: number;
  comment: string;
}

export interface IReviewGetByProductParam {
  productId: number;
}

export type IReviewGetByProductResponse = IApiResponse<IReview[]>;
export type IReviewCreateResponse = IApiResponse<IReview>;
