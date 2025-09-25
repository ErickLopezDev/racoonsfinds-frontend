export interface ILoginReq {
    email: string,
    password: string
}
export interface ILoginRes {
    accessToken: string,
    refreshToken: string,
    tokenType: string,
    expiresAt: string
}