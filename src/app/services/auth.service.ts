import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Auth } from "../common/auth";
import { Store } from "@ngrx/store";
import { HttpClient } from "@angular/common/http";
import { User } from "../common/user";
import { Constants } from "../common/constants";
import { CookieManagerService } from "./cookie-manager.service";
import { login } from "../store/actions/auth.action";
import { Router } from "@angular/router";
import { ToastService } from "./toast/toast.service";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    auth$: Observable<Auth>;
    loggedInUser: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
    constructor(
        private store: Store<{ auth: Auth }>,
        private http: HttpClient,
        private cookie: CookieManagerService,
        private router: Router,
        private toast: ToastService
    ) {
        this.auth$ = store.select("auth");
    }

    login(user: User, password: string): void {
        const cred: any = {
            email: user.email,
            password: password,
        };
        this.http
            .post(Constants.baseUrl + "/user/0/token", cred, {
                observe: "response",
            })
            .subscribe({
                next: (data: any) => {
                    const auth = new Auth();
                    auth.isUserAuthenticated = true;
                    auth.user = data?.body?.user;
                    this.store.dispatch(login({ payload: { loginData: auth } }));
                    this.toast.showToast(this.toast.TOAST_STATE.success, data?.body?.message ? data.body.message : "Login successfull", 3000);
                    if (data?.body?.token) {
                        this.cookie.setCookie("auth", data.body.token, 7);
                    }
                    this.router.navigate([`/${auth.user.userName}`]);
                },
                error: (data: any) => {
                    this.toast.showToast(this.toast.TOAST_STATE.danger, data?.error?.message ? data.error.message : "Login failed", 3000);
                },
            });
    }

    logout(): void {
        this.cookie.deleteCookie("auth");
        this.store.dispatch(login({ payload: { loginData: new Auth() } }));
        this.router.navigate([`/login`]);
    }

    validateLogin(): Observable<User> {
        return this.http.get<User>(Constants.baseUrl + `/user/0/get-loggedin-user`);
    }

    userNameCheck(username: string): Observable<boolean> {
        return this.http.get<boolean>(Constants.baseUrl + `/user/0/check-username/${username}`);
    }

    emailCheck(email: string): Observable<boolean> {
        return this.http.get<boolean>(Constants.baseUrl + `/user/0/check-email/${email}`);
    }

    signup(user: User): void {
        this.http
            .post(Constants.baseUrl + "/user/0/register", user, {
                observe: "response",
            })
            .subscribe({
                next: (data: any) => {
                    const auth = new Auth();
                    auth.isUserAuthenticated = true;
                    auth.user = data.body.user;
                    this.store.dispatch(login({ payload: { loginData: auth } }));
                    this.toast.showToast(this.toast.TOAST_STATE.success, "Registered successfully", 3000);
                    if (data.body?.token) {
                        this.cookie.setCookie("auth", data?.body.token, 7);
                    }
                    this.router.navigate([`/${auth.user.userName}`]);
                },
                error: () => {
                    this.toast.showToast(this.toast.TOAST_STATE.success, "Registeration failed", 3000);
                    this.store.dispatch(login({ payload: { loginData: new Auth() } }));
                },
            });
    }
}
