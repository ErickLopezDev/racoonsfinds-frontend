import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { url } from '../../../environments/environment';

interface UrlParts {
  endpoint: string;
  parameters?: { [key: string]: any };
  queryParams?: { [key: string]: any };
}

export class ApiUtilService {
  protected readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl: string = url;

  protected buildApiUrl(value: UrlParts): string {

    let apiUrl = this.baseUrl + value.endpoint;

    if (value.parameters) {
      for (const [key, param] of Object.entries(value.parameters)) {
        apiUrl = apiUrl.replace(`{${key}}`, encodeURIComponent(param));
      }
    }

    if (value.queryParams) {
      const queryString = Object.entries(value.queryParams)
        .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
        .join('&');
      apiUrl += `?${queryString}`;
    }

    return apiUrl;
  }

  protected transformToFormData(obj: Object): FormData {
    const formData = new FormData();

    Object.entries(obj).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return formData;
  }

}
