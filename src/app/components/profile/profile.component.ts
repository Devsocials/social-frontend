import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Auth } from "../../common/auth";
import { Observable } from "rxjs";
import { PostService } from "../../services/post.service";
import { User } from "../../common/user";
import { Post } from "../../common/post";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrl: "./profile.component.css",
})
export class ProfileComponent implements OnInit {
    auth$: Observable<Auth>;
    user!: User;
    posts$!: Observable<Post[]>;
    username!: string;
    constructor(private route: ActivatedRoute, private store: Store<{ auth: Auth }>, private postService: PostService) {
        this.auth$ = store.select("auth");
    }

    ngOnInit(): void {
        this.route.params.subscribe(() => {
            const username = this.route.snapshot.paramMap.get("username");
            this.auth$.subscribe((data: Auth) => {
                this.user = data.user;
                if (data.isUserAuthenticated) {
                    this.posts$ = this.postService.getPostsByUsername(this.user, username);
                }
            });
        });
    }
}
