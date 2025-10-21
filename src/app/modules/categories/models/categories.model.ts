import { IApiResponse } from "@utils/api-util"

export interface ICategory {
    id: number,
    name: string
}

export type ICategoryGetResponse = IApiResponse<ICategory[]>;

