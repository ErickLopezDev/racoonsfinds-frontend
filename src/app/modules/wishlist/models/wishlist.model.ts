import { IApiResponse } from "@utils/api-util";

export interface IWishlist{
    id: number,
    userId: number,
    productId: number,
    productName: string,
    productImage: string,
    productPrice: number
}

// Get All

export interface IWishlistQueryRequest {
}

export type IWishlistGetResponse = IApiResponse<IWishlist[]>;

// Create Wishlist

export interface IWishlistCreateRequest{
    productId: number
}

export interface IWishlistDeleteByIdParamRequest{
    productId: number
}
