import { IApiResponse } from "@utils/api-util";

export interface IPurcharse {
    id: number,
    date: string,
    monto: number,
    description: string,
    userId: number,
    details: IPurchaseDetail[]
}

export interface IPurchaseDetail {
    id: number,
    productId: number,
    productName: string,
    monto: number,
    amount: number
}

export type IPurcharsesCreateFromCartResponse = IApiResponse<IPurcharse>;

export type IPurcharsesGetMyPurchasesResponse = IApiResponse<IPurcharse[]>;

export type IPurcharsesGetMySalesResponse = IApiResponse<IPurcharse[]>;







