import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, of, take } from "rxjs";
import { Auth } from "../../common/auth";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { login } from "../../store/actions/auth.action";
import { AuthService } from "../auth.service";

@Injectable({
    providedIn: "root",
})
export class LoginguardService {
    userAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    constructor(private store: Store<{ auth: Auth }>, private router: Router, private authService: AuthService) {}

    canActivate(): Observable<boolean> {
        return this.authService.validateLogin().pipe(
            take(1),
            map((data) => {
                const auth = new Auth();
                auth.isUserAuthenticated = true;
                auth.user = data;
                this.store.dispatch(login({ payload: { loginData: auth } }));
                console.log("authenticated");
                return true;
            }),
            catchError((err) => {
                this.router.navigate([`/login`]);
                this.store.dispatch(login({ payload: { loginData: new Auth() } }));
                console.log("authentication failed");
                return of(false);
            }),
        );
    }
}
