import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Auth } from "./common/auth";
import { Store } from "@ngrx/store";
import { CookieManagerService } from "./services/cookie-manager.service";
import { Constants } from "./common/constants";
import { User } from "./common/user";
import { login } from "./store/actions/auth.action";
import { Router } from "@angular/router";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
    constructor(
        private store: Store<{ auth: Auth }>,
        private http: HttpClient,
        private cookie: CookieManagerService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        if (this.cookie.getCookie("auth")) {
            this.http.get<User>(Constants.baseUrl + `/user/fds/get-loggedin-user`).subscribe({
                next: (data: any) => {
                    const auth = new Auth();
                    auth.isUserAuthenticated = true;
                    auth.user = data;
                    this.store.dispatch(login({ payload: { loginData: auth } }));
                    // this.router.navigate([`/${auth.user.userName}`]);
                    console.log("authenticated");
                    
                },
                error: () => {
                    this.router.navigate([`/login`]);
                    this.store.dispatch(login({ payload: { loginData: new Auth() } }));
                    console.log("authentication failed");
                },
            });
        }
    }
    title = "social-app";
}
