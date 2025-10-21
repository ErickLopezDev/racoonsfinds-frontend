import { IApiResponse } from "@utils/api-util"

export interface IProduct {
    id: number,
    name: string,
    stock: number,
    image: string,
    price: number,
    description: string,
    createdDate: string,
    eliminado: boolean,
    categoryId: number,
    categoryName: string,
    userId: number,
    userName: string,
    imageUrl: string
}

// Get All
export interface IProductGetQueryRquest {
    page?: number,
    size?: number,
    categoryId?: number,
    search?: string,
}

export type IProductGetResponse = IApiResponse<IProductGetDto>;

export interface IProductGetDto {
    content: IProduct[],
    currentPage: number,
    totalPages: number,
    totalItems: number,
    pageSize: number
}

// Create Product
export interface IProductCreateRequest {
    name: string,
    stock: number,
    price: number,
    description: string,
    categoryId: number,
    file: any,
}
export type IProductCreateResponse = IApiResponse<IProduct>;


// Get By Id
export interface IProductGetByIdParamRequest {
    id: number,
}
export type IProductGetByIdResponse = IApiResponse<IProduct>;


//delete by id
export interface IProductDeleteByIdParamRequest {
    id: number,
}
export type IProductDeleteByIdResponse = IApiResponse<IProduct>;