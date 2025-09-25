import { Injectable } from '@angular/core';
import { ApiUtilService } from '../../../shared/utils/api-util.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Category, CategoryPostReq, CategoryPutReq } from '../models/category.model';
import { url } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiUtilService {

  public getAll(): Observable<Category[]> {
    const api = url + 'v1/categories'; // Reemplaza con la URL real de tu API

    return this.http.get<Category[]>(api)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return throwError(() => new Error(error));
        })
      );
  }

  public create(req: CategoryPostReq): Observable<Category> {
    const api = url + 'v1/categories'; // Reemplaza con la URL real de tu API

    return this.http.post<Category>(api, req)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return throwError(() => new Error(error));
        })
      );
  }

  public update(id: string, req: CategoryPutReq): Observable<Category> {
    const api = url + 'v1/categories/' + id; // Reemplaza con la URL real de tu API

    return this.http.put<Category>(api, req)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return throwError(() => new Error(error));
        })
      );
  }

  public delete(id: string): Observable<any> {
    const api = url + 'v1/categories/' + id;

    return this.http.delete<any>(api)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return throwError(() => new Error(error));
        })
      );
  }


}
