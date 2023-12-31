import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Auth } from "../../common/auth";
import { User } from "../../common/user";
import { Post } from "../../common/post";
import { PostService } from "../../services/post.service";

@Component({
    selector: "app-timeline",
    templateUrl: "./timeline.component.html",
    styleUrl: "./timeline.component.css",
})
export class TimelineComponent implements OnInit {
    auth$: Observable<Auth>;
    user!: User;
    posts$!: Observable<Post[]>;
    username!: string;
    constructor(private store: Store<{ auth: Auth }>, private postService: PostService) {
        this.auth$ = store.select("auth");
    }

    ngOnInit(): void {
        this.auth$.subscribe((data: Auth) => {
            this.user = data.user;
            if (data.isUserAuthenticated) {
                this.posts$ = this.postService.getTimeLinePosts(this.user);
            }
        });
    }
}
