import { Injectable } from "@angular/core";
import { ApiUtilService } from "@utils/api-util.service";
import { Observable } from "rxjs";
import { IPurcharsesCreateFromCartResponse, IPurcharsesGetMyPurchasesResponse, IPurcharsesGetMySalesResponse } from "../models/purchases.model";
import { PURCHASES_API_ROUTES } from "./purchases-api.routing";

@Injectable({
    providedIn: 'root'
})
export class PurchasesService extends ApiUtilService {
    purchase(): Observable<IPurcharsesCreateFromCartResponse> {
        const url = this.buildApiUrl({ endpoint: PURCHASES_API_ROUTES.create })
        return this.http.post<IPurcharsesCreateFromCartResponse>(url, undefined);
    }

    getMysales(): Observable<IPurcharsesGetMyPurchasesResponse> {
        const url = this.buildApiUrl({ endpoint: PURCHASES_API_ROUTES.mySales })
        return this.http.get<IPurcharsesGetMyPurchasesResponse>(url);
    }

    getMyPurchases(): Observable<IPurcharsesGetMySalesResponse> {
        const url = this.buildApiUrl({ endpoint: PURCHASES_API_ROUTES.myPurchases })
        return this.http.get<IPurcharsesGetMySalesResponse>(url);
    }

}