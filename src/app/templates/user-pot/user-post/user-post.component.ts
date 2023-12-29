import { Component, Input, OnInit } from "@angular/core";
import { Post } from "../../../common/post";
import { BehaviorSubject } from "rxjs";
import { User } from "../../../common/user";
import { Comment } from "../../../common/comment";
import { PostService } from "../../../services/post.service";
import { NgForm } from "@angular/forms";

@Component({
    selector: "app-user-post",
    templateUrl: "./user-post.component.html",
    styleUrl: "./user-post.component.css",
})
export class UserPostComponent implements OnInit {
    @Input() user!: User;
    @Input() postDetails!: Post;
    comments$: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);
    commentsHidden: boolean = true;
    isLiked: boolean = false;

    constructor(private postService: PostService) {}

    ngOnInit(): void {}

    getComments() {
        this.commentsHidden = !this.commentsHidden;
        if (!this.commentsHidden) {
            this.postService.getCommentsByPostId(this.user, this.postDetails.id).subscribe({
                next: (data) => {
                    this.comments$.next(data);
                },
            });
        }
    }

    addComment(commentForm: NgForm) {
        const newComment = new Comment();
        newComment.comment = commentForm.controls["comment"].value;
        newComment.user = this.user;
        this.postService.addComment(this.user, this.postDetails.id, newComment).subscribe({
            next: () => {
                const newComments: Comment[] = this.comments$.value;
                newComments.push(newComment);
                this.comments$.next(newComments);
                this.postDetails.noOfComments++;
                commentForm.resetForm();
            },
        });
    }
}
