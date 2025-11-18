import { Injectable } from '@angular/core';
import { ApiUtilService } from '@utils/api-util.service';
import { Observable } from 'rxjs';
import {ICategoryGetResponse } from '../models/categories.model';
import { CATEGORY_API_ROUTES } from './category-api.routing';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends ApiUtilService {

  getAll(): Observable<ICategoryGetResponse> {
    const url = this.buildApiUrl({ endpoint: CATEGORY_API_ROUTES.general });
    return this.http.get<ICategoryGetResponse>(url);
  }

}