import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Auth } from "../../common/auth";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { User } from "../../common/user";
import { Following } from "../../common/following";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-followers",
    templateUrl: "./followers.component.html",
    styleUrl: "./followers.component.css",
})
export class FollowersComponent implements OnInit {
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
                    this.followers$ = this.userService.getFollowersByUserName(this.user, username);
                }
            });
        });
    }
}
