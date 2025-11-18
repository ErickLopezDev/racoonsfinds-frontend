import { Injectable } from '@angular/core';
import { ApiUtilService } from '@utils/api-util.service';
import { Observable } from 'rxjs';
import { IWishlistCreateRequest, IWishlistDeleteByIdParamRequest, IWishlistGetResponse } from '../models/wishlist.model';
import { WISHLIST_API_ROUTES } from './wishlist-api.routing';

@Injectable({
  providedIn: 'root'
})

export class WishlistService extends ApiUtilService {

  getAll(): Observable<IWishlistGetResponse> {
    const url = this.buildApiUrl({ endpoint: WISHLIST_API_ROUTES.getAll });
    return this.http.get<IWishlistGetResponse>(url);
  }

  create(value: { body: IWishlistCreateRequest }): Observable<IWishlistCreateRequest> {
    const url = this.buildApiUrl({ endpoint: WISHLIST_API_ROUTES.create });
    return this.http.post<IWishlistCreateRequest>(url, value.body);
  }

  delete(value: { body: IWishlistDeleteByIdParamRequest }): Observable<any> {
    const url = this.buildApiUrl({ endpoint: WISHLIST_API_ROUTES.deleteById, parameters: value.body });
    return this.http.delete<any>(url);
  }
}
