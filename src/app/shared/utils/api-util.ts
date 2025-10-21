export type IApiResponse<T> = {
    message: string,
    data: T
    success: boolean,
    timestamp: string
}
