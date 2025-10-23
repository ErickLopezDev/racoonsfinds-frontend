import { IApiResponse } from "@utils/api-util";


export interface ICart{
    id: number,
    userId: number,
    productId: number,
    productName: string,
    productImage: string,
    productPrice: number,
    amount: number
}

export interface ICartGetAllRequest {
}

export interface ICartCreateRequest {
    productId: number,
    amount: number
}

export type ICartCreateResponse = IApiResponse<ICart>;



export interface ICartDeleteRequest{
}

export type ICartDeleteResponse = IApiResponse<ICart>;

export interface ICartDeleteByIdParamRequest {
    productId: number,
}
export type ICartDeleteByIdParamResponse = IApiResponse<ICart>;