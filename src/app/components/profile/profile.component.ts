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
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrl: "./profile.component.css",
})
export class ProfileComponent implements OnInit {
    auth$: Observable<Auth>;
    editPostForm!: FormGroup;
    loggedInUser!: User;
    viewingProfileOf!: User;
    posts$!: Observable<Post[]>;
    username!: string;
    editPostModal: boolean = false;
    postToBeEdited!: Post;
    constructor(
        private route: ActivatedRoute,
        private store: Store<{ auth: Auth }>,
        private postService: PostService,
        private userService: UserService,
    ) {
        this.auth$ = store.select("auth");
    }

    ngOnInit(): void {
        this.editPostForm = new FormGroup({
            location: new FormControl("", []),
            caption: new FormControl("", []),
        });
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
        const followAction: FollowAction =
            this.viewingProfileOf.isUserFollowedByLoggedInUser === "FOLLOWING" ||
            this.viewingProfileOf.isUserFollowedByLoggedInUser === "REQUESTED"
                ? FollowAction.UNFOLLOW
                : FollowAction.FOLLOW;
        this.userService
            .followUser(this.loggedInUser, this.viewingProfileOf.id, followAction)
            .pipe(take(1))
            .subscribe({
                next: (data) => {
                    // this.viewingProfileOf.userFollowedByLoggedInUser = !this.viewingProfileOf.userFollowedByLoggedInUser;
                    if (this.viewingProfileOf.isUserFollowedByLoggedInUser === "NOT_FOLLOWING" && data.followRequest === "PENDING") {
                        this.viewingProfileOf.isUserFollowedByLoggedInUser = "REQUESTED";
                    } else if (this.viewingProfileOf.isUserFollowedByLoggedInUser === "REQUESTED") {
                        this.viewingProfileOf.isUserFollowedByLoggedInUser = "NOT_FOLLOWING";
                    } else if (this.viewingProfileOf.isUserFollowedByLoggedInUser === "FOLLOWING") {
                        this.viewingProfileOf.isUserFollowedByLoggedInUser = "NOT_FOLLOWING";
                    } else {
                        this.viewingProfileOf.isUserFollowedByLoggedInUser = "FOLLOWING";
                    }
                },
            });
    }

    editPostModalSettings(post: Post): void {
        this.editPostForm.controls["caption"].setValue(post.caption);
        this.editPostForm.controls["location"].setValue(post.location);
        this.postToBeEdited = post;
        this.editPostModal = true;
    }

    closeEditPostModal() {
        this.editPostModal = false;
    }

    saveEdittedPost() {
        this.postToBeEdited.caption = this.editPostForm.controls["caption"].value;
        this.postToBeEdited.location = this.editPostForm.controls["location"].value;
        this.postService.editPost(this.postToBeEdited);
        this.postToBeEdited = new Post();
        this.closeEditPostModal();
    }
}
