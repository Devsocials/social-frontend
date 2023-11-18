import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Auth } from "../common/auth";
import { Store } from "@ngrx/store";
import { HttpClient } from "@angular/common/http";
import { User } from "../common/user";
import { Constants } from "../common/constants";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    auth$: Observable<Auth>;
    constructor(private store: Store<{ auth: Auth }>, private http: HttpClient) {
        this.auth$ = store.select("auth");
    }

    login(user: User): void {
        this.http
            .post(Constants.baseUrl + "/login", user, {
                responseType: "text",
                observe: "response",
            })
            .subscribe((data) => {
                console.log("data after login", data);
            });
    }
}
