import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom, Observable, from } from "rxjs";
import { CookieManagerService } from "../cookie-manager.service";

@Injectable({
    providedIn: "root",
})
export class HttpInterceptorService implements HttpInterceptor {
    constructor(private cookie: CookieManagerService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.handleAccess(request, next));
    }
    private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
        const openEndpoints = ["http://localhost:9001/user/0/token", "http://localhost:9001/user/0/check", "http://localhost:9001/user/0/register"];
        const accessToken = this.cookie.getCookie("auth");
        if (!openEndpoints.some((url) => request.urlWithParams.startsWith(url))) {
            request = request.clone({
                setParams: {
                    Authorization: "Bearer " + accessToken,
                },
                setHeaders: {
                    Authorization: "Bearer " + accessToken,
                },
            });
        }
        return await lastValueFrom(next.handle(request));
    }
}
