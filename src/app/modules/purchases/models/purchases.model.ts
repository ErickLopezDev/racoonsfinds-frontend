import { IApiResponse } from "@utils/api-util";


export interface IPurchases {
    id: number,
    date: string,
    monto: number,
    description: string,
    userId: number,
    details: IPurcharsesDetails[]
}

export interface IPurcharsesDetails {
    id: number,
    productId: number,
    productName: string,
    monto: number,
    amount: number
}

export interface IPurcharsesGetAllRequest{

}

export type IPurcharsesGetAllResponse = IApiResponse<IPurchases[]>;