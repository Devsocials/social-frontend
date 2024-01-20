import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Comment } from "../../../common/comment";
import { PostService } from "../../../services/post.service";
import { Observable } from "rxjs";
import { User } from "../../../common/user";

@Component({
    selector: "post-comment",
    templateUrl: "./comment.component.html",
    styleUrl: "./comment.component.css",
})
export class CommentComponent {
    @Input() loggedInUser!: User;
    @Input() comment!: Comment;
    @Output() onReply = new EventEmitter<Comment>();
    commentReplies$!: Observable<Comment[]>;
    viewReplies: boolean = false;

    constructor(private postService: PostService) {}

    onReplyClick() {
        this.viewReplies = false;
        this.onReply.emit(this.comment);
    }

    getCommentReplies() {
        this.viewReplies = !this.viewReplies;
        if (this.viewReplies) {
            this.commentReplies$ = this.postService.getCommentReplies(this.loggedInUser, this.comment.post.id, this.comment);
        }
    }
    
}
