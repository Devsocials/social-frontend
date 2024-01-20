import { Post } from "./post";
import { User } from "./user";

export class Comment {
    id!: number;
    comment!: string;
    user!: User;
    dateCreated!: Date;
    nestedCommentId?: number;
    post!: Post;
}
