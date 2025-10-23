import { Injectable } from '@angular/core';
import { ApiUtilService } from '@utils/api-util.service';
import { ICartCreateRequest, ICartCreateResponse, ICartDeleteByIdParamRequest, ICartDeleteByIdParamResponse, ICartDeleteResponse, ICartGetAllResponse } from '../models/cart.model';
import { Observable } from 'rxjs';
import { CART_API_ROUTES } from './cart-api.routing';

@Injectable({
  providedIn: 'root'
})
export class CartService extends ApiUtilService {

  getAll(): Observable<ICartGetAllResponse> {
    const url = this.buildApiUrl({ endpoint: CART_API_ROUTES.getAll });
    return this.http.get<ICartGetAllResponse>(url);
  }


  create(value: { body: ICartCreateRequest }): Observable<ICartCreateResponse> {
    const url = this.buildApiUrl({ endpoint: CART_API_ROUTES.create });
    return this.http.post<ICartCreateResponse>(url, value.body);
  }

  deleteById(value: { param: ICartDeleteByIdParamRequest }): Observable<ICartDeleteByIdParamResponse> {
    const url = this.buildApiUrl({ endpoint: CART_API_ROUTES.deleteById, parameters: value.param });
    return this.http.delete<ICartDeleteByIdParamResponse>(url);
  }

  deleteAll(): Observable<ICartDeleteResponse> {
    const url = this.buildApiUrl({ endpoint: CART_API_ROUTES.deleteAll });
    return this.http.delete<ICartDeleteResponse>(url);
  }


}
