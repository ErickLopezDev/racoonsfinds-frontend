import { Injectable } from '@angular/core';
import { ApiUtilService } from '@utils/api-util.service';
import { Observable } from 'rxjs';
import { PRODUCT_API_ROUTES } from './product-api.routing';
import { IProductCreateRequest, IProductDeleteByIdParamRequest, IProductGetByIdParamRequest, IProductGetQueryRquest, IProductGetResponse } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ApiUtilService {

  getAll(value: { query: IProductGetQueryRquest }): Observable<IProductGetResponse> {
    const url = this.buildApiUrl({ endpoint: PRODUCT_API_ROUTES.getAll, queryParams: value.query });
    return this.http.get<IProductGetResponse>(url);
  }

  create(value: { body: IProductCreateRequest }): Observable<IProductGetResponse> {
    console.log(value.body);
    const body = this.transformToFormData(value.body);
    console.log(body);
    const url = this.buildApiUrl({ endpoint: PRODUCT_API_ROUTES.create });
    console.log(url);
    return this.http.post<IProductGetResponse>(url, body);
  }

  getById(value: { body: IProductGetByIdParamRequest }): Observable<IProductGetResponse> {
    const url = this.buildApiUrl({ endpoint: PRODUCT_API_ROUTES.getById, parameters: value.body });
    return this.http.get<IProductGetResponse>(url);
  }

  delete(value: { body: IProductDeleteByIdParamRequest }): Observable<any> {
    const url = this.buildApiUrl({ endpoint: PRODUCT_API_ROUTES.deleteById, parameters: value.body });
    return this.http.delete<any>(url);
  }

}