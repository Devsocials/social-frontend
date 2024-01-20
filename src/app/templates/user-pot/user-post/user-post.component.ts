import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { Post } from "../../../common/post";
import { BehaviorSubject } from "rxjs";
import { User } from "../../../common/user";
import { Comment } from "../../../common/comment";
import { PostService } from "../../../services/post.service";
import { NgForm } from "@angular/forms";
import { CommentComponent } from "../comment/comment.component";

@Component({
    selector: "app-user-post",
    templateUrl: "./user-post.component.html",
    styleUrl: "./user-post.component.css",
})
export class UserPostComponent implements OnInit {
    @Input() user!: User;
    @Input() postDetails!: Post;
    @Output() editPostEvent = new EventEmitter<Post>();
    comments$: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);
    commentsHidden: boolean = true;
    replying: Comment | null = null;

    constructor(private postService: PostService) {}

    ngOnInit(): void {
        
    }

    getComments() {
        this.commentsHidden = !this.commentsHidden;
        if (!this.commentsHidden) {
            this.postService.getCommentsByPostId(this.user, this.postDetails.id).subscribe({
                next: (data) => {
                    this.postDetails.noOfComments = data.length;
                    this.comments$.next(data);  
                },
            });
        } else {
            this.replying = null;
        }
    }

    addComment(commentForm: NgForm) {
        const newComment = new Comment();
        newComment.comment = commentForm.controls["comment"].value;
        newComment.user = this.user;
        if (this.replying) {
            newComment.nestedCommentId = this.replying.id;
        }
        this.postService.addComment(this.user, this.postDetails.id, newComment).subscribe({
            next: () => {
                if (!newComment.nestedCommentId) {
                    const newComments: Comment[] = this.comments$.value;
                    newComments.push(newComment);
                    this.comments$.next(newComments);
                    this.postDetails.noOfComments++;
                }
                commentForm.resetForm();
            },
        });
    }

    likePost() {
        const action: string = this.postDetails.likedByUser ? "UNLIKE" : "LIKE";
        this.postService.likePost(this.user, this.postDetails.id, action).subscribe({
            next: () => {
                if (action === "LIKE") {
                    this.postDetails.noOfLikes++;
                } else {
                    this.postDetails.noOfLikes--;
                }
                this.postDetails.likedByUser = !this.postDetails.likedByUser;
            },
        });
    }

    editPost() {
        this.editPostEvent.emit(this.postDetails);
    }

    onReply(reply: Comment) {
        this.replying = reply;
    }

    cancelReply() {
        this.replying = null;
    }
}
