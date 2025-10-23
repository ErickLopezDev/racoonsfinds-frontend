import { IApiResponse } from "@utils/api-util"

export type IUserMeResponse = IApiResponse<IUserMeDto>
export interface IUserMeDto {
    username: string,
    email: string,
    birthDate: string,
    imageUrl: string
}

export interface IUserPutQueryReq {
    username?: string,
    birthDate?: string,
}
export interface IUserPutBodyReq {
    file?: any,
}
export type IUserPutResponse = IApiResponse<IUserPutDto>
export interface IUserPutDto {
    username: string,
    email: string,
    birthDate: string,
    imageUrl: string
}


