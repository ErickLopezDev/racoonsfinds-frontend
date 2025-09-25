import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';


export class ApiUtilService {
  protected readonly http: HttpClient = inject(HttpClient);

}
