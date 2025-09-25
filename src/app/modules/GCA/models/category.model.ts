export interface Category {
    id: string,
    name: string,
    description: string,
    active: boolean,
    createdAt: string,
    updatedAt: string
}

export interface CategoryPutReq {
    name: string,
    description: string,
    active: boolean
}

export interface CategoryPostReq {
    name: string,
    description: string,
    active: boolean
}