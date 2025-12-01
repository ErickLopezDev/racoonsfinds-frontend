import { IApiResponse } from "@utils/api-util";


export interface ICart{
    id: number,
    userId: number,
    productId: number,
    productName: string,
    productImage: string,
    productPrice: number,
    stock: number,
    amount: number
}

export type ICartGetAllResponse = IApiResponse<ICart[]>;

export interface ICartCreateRequest {
    productId: number,
    amount: number
}

export type ICartCreateResponse = IApiResponse<ICart>;


export type ICartDeleteResponse = IApiResponse<any>;

export interface ICartDeleteByIdParamRequest {
    id: number,
}
export type ICartDeleteByIdParamResponse = IApiResponse<ICart>;