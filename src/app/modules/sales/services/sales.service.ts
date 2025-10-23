import { Injectable } from "@angular/core";
import { ApiUtilService } from "@utils/api-util.service";
import { ISaleGetAllRequest, ISaleGetAllResponse } from "../models/sales.model";
import { Observable } from "rxjs";
import { PRODUCT_API_ROUTES } from "../../products/services/product-api.routing";

@Injectable({
    providedIn:'root'
})
export class SalesService extends ApiUtilService {
    getAll(): Observable<ISaleGetAllResponse>{
        const url = this.buildApiUrl({endpoint: PRODUCT_API_ROUTES.getAll})
        return this.http.get<ISaleGetAllResponse>(url);
    }
}