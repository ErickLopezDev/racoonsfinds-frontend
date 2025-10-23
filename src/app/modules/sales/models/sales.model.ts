import { IApiResponse } from "@utils/api-util";

export interface ISales {
    id: number,
    date: string,
    monto: number,
    description: string,
    userId: number,
    details: ISalesDetails[]
}

export interface ISalesDetails {
    id: number,
    productId: number,
    productName: string,
    monto: number,
    amount: number
}

export interface ISaleGetAllRequest {
}
export type ISaleGetAllResponse = IApiResponse<ISales[]>;