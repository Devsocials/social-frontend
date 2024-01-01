import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Auth } from "../../common/auth";
import { Observable, take } from "rxjs";
import { PostService } from "../../services/post.service";
import { User } from "../../common/user";
import { Post } from "../../common/post";
import { UserService } from "../../services/user.service";
import { FollowAction } from "../../common/follow-action";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrl: "./profile.component.css",
})
export class ProfileComponent implements OnInit {
    auth$: Observable<Auth>;
    loggedInUser!: User;
    viewingProfileOf!: User;
    posts$!: Observable<Post[]>;
    username!: string;
    constructor(
        private route: ActivatedRoute,
        private store: Store<{ auth: Auth }>,
        private postService: PostService,
        private userService: UserService,
    ) {
        this.auth$ = store.select("auth");
    }

    ngOnInit(): void {
        this.route.params.subscribe(() => {
            const username = this.route.snapshot.paramMap.get("username");
            this.auth$.subscribe((data: Auth) => {
                this.loggedInUser = data.user;
                if (data.isUserAuthenticated) {
                    this.posts$ = this.postService.getPostsByUsername(this.loggedInUser, username);
                    this.userService
                        .getUserByUserName(this.loggedInUser, username)
                        .pipe(take(1))
                        .subscribe({
                            next: (data) => {
                                this.viewingProfileOf = data;
                            },
                        });
                }
            });
        });
    }

    followUser(): void {
        const followAction: FollowAction = this.viewingProfileOf.userFollowedByLoggedInUser ? FollowAction.UNFOLLOW : FollowAction.FOLLOW;
        this.userService
            .followUser(this.loggedInUser, this.viewingProfileOf.id, followAction)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.viewingProfileOf.userFollowedByLoggedInUser = !this.viewingProfileOf.userFollowedByLoggedInUser;
                },
            });
    }
}
