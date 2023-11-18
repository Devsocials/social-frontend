import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }
  private async handleAccess(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Promise<HttpEvent<any>> {
    const openEndpoints = [];
    const accessToken = '';
    request = request.clone({
      setParams: {
        Authorization: 'Bearer ' + accessToken,
      },
      setHeaders: {
        Authorization: 'Bearer ' + accessToken,
      },
    });
    return await lastValueFrom(next.handle(request));
  }
}
