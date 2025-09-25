import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiUtilService } from '../../../../shared/utils/api-util.service';
import { ILoginReq, ILoginRes } from './auth.model';
import { url } from '../../../../../environments/environment';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiUtilService {

  public login(body: ILoginReq): Observable<ILoginRes> {
    const api = url + 'v1/auth/login'; // Reemplaza con la URL real de tu API

    return this.http.post<ILoginRes>(api, body)
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
