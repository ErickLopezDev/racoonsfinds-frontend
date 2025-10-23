import { Injectable } from "@angular/core";
import { ApiUtilService } from "@utils/api-util.service";
import { IPurcharsesGetAllRequest, IPurcharsesGetAllResponse } from "../models/purchases.model";
import { Observable } from "rxjs";
import { PRODUCT_API_ROUTES } from "../../products/services/product-api.routing";

@Injectable({
    providedIn: 'root'
})
export class PurchasesService extends ApiUtilService{
    getAll(): Observable<IPurcharsesGetAllResponse>{
        const url = this.buildApiUrl({endpoint: PRODUCT_API_ROUTES.getAll})
        return this.http.get<IPurcharsesGetAllResponse>(url);
    }
}