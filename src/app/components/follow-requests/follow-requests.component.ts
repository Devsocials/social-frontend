import { Component } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Auth } from "../../common/auth";
import { User } from "../../common/user";
import { Following } from "../../common/following";
import { Store } from "@ngrx/store";
import { UserService } from "../../services/user.service";

@Component({
    selector: "app-follow-requests",
    templateUrl: "./follow-requests.component.html",
    styleUrl: "./follow-requests.component.css",
})
export class FollowRequestsComponent {
    auth$: Observable<Auth>;
    loggedInUser!: User;
    followRequests$: BehaviorSubject<Following[]> = new BehaviorSubject<Following[]>([]);
    constructor(private store: Store<{ auth: Auth }>, private userService: UserService) {
        this.auth$ = store.select("auth");
    }

    ngOnInit(): void {
        this.auth$.subscribe((data: Auth) => {
            this.loggedInUser = data.user;
            if (data.isUserAuthenticated) {
                this.userService.getFollowRequests(this.loggedInUser).subscribe({
                    next: (data) => {
                        this.followRequests$.next(data);
                    },
                });
            }
        });
    }

    acceptRequest(followingId: number): void {
        this.userService.followRequestAction(this.loggedInUser, followingId).subscribe({
            next: () => {
                const newRequests: Following[] = [];
                this.followRequests$.value.map((item) => {
                    if (item.user.id !== followingId) {
                        newRequests.push(item);
                    }
                });
                this.followRequests$.next(newRequests);
            },
        });
    }
}
