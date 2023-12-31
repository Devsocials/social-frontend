import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Auth } from "../../common/auth";
import { User } from "../../common/user";
import { Following } from "../../common/following";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { UserService } from "../../services/user.service";

@Component({
    selector: "app-following",
    templateUrl: "./following.component.html",
    styleUrl: "./following.component.css",
})
export class FollowingComponent implements OnInit {
    auth$: Observable<Auth>;
    user!: User;
    followers$!: Observable<Following[]>;
    constructor(private route: ActivatedRoute, private store: Store<{ auth: Auth }>, private userService: UserService) {
        this.auth$ = store.select("auth");
    }

    ngOnInit(): void {
        this.route.params.subscribe(() => {
            const username = this.route.snapshot.paramMap.get("username");
            this.auth$.subscribe((data: Auth) => {
                this.user = data.user;
                if (data.isUserAuthenticated) {
                    this.followers$ = this.userService.getFollowingByUserName(this.user, username);
                }
            });
        });
    }
}
