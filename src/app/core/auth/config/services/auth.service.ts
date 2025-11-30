import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiUtilService } from '../../../../shared/utils/api-util.service';
import { IChangePasswordReq, IChangePasswordRes, IForgetPasswordReq, IForgetPasswordRes, ILoginReq, ILoginRes, IRegisterReq, IRegisterRes, IResendCodeReq, IResendCodeRes, IVerifyReq, IVerifyRes } from './auth.model';
import { API_AUTH_ROUTES } from './api-auth.routes';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiUtilService {

  public register(body: IRegisterReq): Observable<IRegisterRes> {

    const url = this.buildApiUrl({ endpoint: API_AUTH_ROUTES.register });

    return this.http.post<IRegisterRes>(url, body)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return throwError(() => new Error(error));
        })
      );

  }

  public resendCode(body: IResendCodeReq): Observable<IResendCodeRes> {

    const url = this.buildApiUrl({ endpoint: API_AUTH_ROUTES.resend });

    return this.http.post<IResendCodeRes>(url, body)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return throwError(() => new Error(error));
        })
      );

  }

  public verify(body: IVerifyReq): Observable<IVerifyRes> {

    const url = this.buildApiUrl({ endpoint: API_AUTH_ROUTES.verify });

    return this.http.post<IVerifyRes>(url, body)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return throwError(() => new Error(error));
        })
      );

  }

  public login(body: ILoginReq): Observable<ILoginRes> {

    const url = this.buildApiUrl({ endpoint: API_AUTH_ROUTES.login });

    return this.http.post<ILoginRes>(url, body)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return throwError(() => new Error(error));
        })
      );
  }

  public forgotPassword(body: IForgetPasswordReq): Observable<IForgetPasswordRes> {
    const url = this.buildApiUrl({ endpoint: API_AUTH_ROUTES.forgetPassword });

    return this.http.post<IForgetPasswordRes>(url, body).pipe(
      map((response) => response),
      catchError((error) => throwError(() => new Error(error)))
    );
  }

  public changePassword(body: IChangePasswordReq, token: string): Observable<IChangePasswordRes> {
    const url = this.buildApiUrl({
      endpoint: API_AUTH_ROUTES.changePassword,
      queryParams: { token }
    });

    return this.http.put<IChangePasswordRes>(url, body).pipe(
      map((response) => response),
      catchError((error) => throwError(() => new Error(error)))
    );
  }

}
