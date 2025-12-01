import { Injectable } from '@angular/core';
import { ApiUtilService } from '@utils/api-util.service';
import { Observable } from 'rxjs';
import { IUserDeleteResponse, IUserMeResponse, IUserPutBodyReq, IUserPutQueryReq, IUserPutResponse } from '../models/user.model';
import { USER_API_ROUTES } from './user-api.routes';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiUtilService {

  getUserMe(): Observable<IUserMeResponse> {
    const url = this.buildApiUrl({ endpoint: USER_API_ROUTES.me });


    return this.http.get<IUserMeResponse>(url);
  }

  updateUserMe(value: { query: IUserPutQueryReq, body: IUserPutBodyReq }): Observable<IUserPutResponse> {

    const url = this.buildApiUrl({ endpoint: USER_API_ROUTES.updateMe, queryParams: value.query });

    const body = this.transformToFormData(value.body);

    return this.http.put<IUserPutResponse>(url, body);
  }

  deleteUser(): Observable<IUserDeleteResponse> {
    const url = this.buildApiUrl({ endpoint: USER_API_ROUTES.delete });
    return this.http.delete<IUserDeleteResponse>(url);
  }

}
