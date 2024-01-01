import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, take, takeUntil } from "rxjs";
import { Auth } from "../../common/auth";
import { Store } from "@ngrx/store";
import { User } from "../../common/user";
import { UserService } from "../../services/user.service";
import { Following } from "../../common/following";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrl: "./navbar.component.css",
})
export class NavbarComponent implements OnInit {
    onDestroy$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    auth$: Observable<Auth>;
    isUserLoggedIn: boolean = false;
    loggedInUser!: User;
    searchedUserList$?: Observable<Following[]>;
    constructor(private store: Store<{ auth: Auth }>, private userService: UserService) {
        this.auth$ = store.select("auth");
    }

    ngOnInit(): void {
        this.auth$.subscribe((data) => {
            if (data.isUserAuthenticated) {
                this.isUserLoggedIn = true;
                this.loggedInUser = data.user;
            }
        });
    }

    onSearch(userName: string) {
        this.searchedUserList$ = this.userService.searchUsersByName(this.loggedInUser, userName);
    }
}
