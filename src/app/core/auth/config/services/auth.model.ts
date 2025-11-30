import { IApiResponse } from "@utils/api-util"

//#region Verify
export interface IVerifyReq {
    email: string,
    code: string
}
export type IVerifyRes = IApiResponse<IVerifyDto>
export interface IVerifyDto {
    userId: number,
    status: number,
    accessToken: string,
    refreshToken: string,
    tokenType: string
}
//#endregion

//#region Change Password
export interface IChangePasswordReq {
    newPassword: string
}
export type IChangePasswordRes = IApiResponse<IChangePasswordDto>
export type IChangePasswordDto = {}
//#endregion

//#region resend code
export interface IResendCodeReq {
    email: string
}
export type IResendCodeRes = IApiResponse<IResendCodeDto>
export type IResendCodeDto = {}
//#endregion

//#region Register
export interface IRegisterReq {
    username: string,
    email: string,
    password: string,
    birthDate: string
}
export type IRegisterRes = IApiResponse<IRegisterDto>
export type IRegisterDto = {}
//#endregion

//#region Login
export interface ILoginReq {
    email: string,
    password: string
}
export type ILoginRes = IApiResponse<ILoginDto>
export interface ILoginDto {
    userId: number,
    accessToken: string,
    status: number,
    refreshToken: string,
    tokenType: string
}
//#endregion

// #region Forget Password
export interface IForgetPasswordReq {
    email: string
}
export type IForgetPasswordRes = IApiResponse<IForgetPasswordDto>
export type IForgetPasswordDto = {}
// #endregion
