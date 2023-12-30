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
    ) {
        this.auth$ = store.select("auth");
    }

    login(user: User, password: string): void {
        const cred: any = {
            email: user.email,
            password: password,
        };
        this.http
            .post(Constants.baseUrl + "/user/fds/token", cred, {
                observe: "response",
            })
            .subscribe({
                next: (data: any) => {
                    const auth = new Auth();
                    auth.isUserAuthenticated = true;
                    auth.user = data.body.user;
                    this.store.dispatch(login({ payload: { loginData: auth } }));
                    if (data.body?.token) {
                        this.cookie.setCookie("auth", data?.body.token, 7);
                    }
                    this.router.navigate([`/${auth.user.userName}`]);
                },
                error: () => {
                    this.store.dispatch(login({ payload: { loginData: new Auth() } }));
                },
            });
    }

    validateLogin(): Observable<User> {
        return this.http.get<User>(Constants.baseUrl + `/user/fds/get-loggedin-user`);
    }
}
