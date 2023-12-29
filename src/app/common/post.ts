import { User } from "./user";

export class Post {
    id!: number;
    postUrl!: string;
    user!: User;
    noOfLikes!: number;
    noOfComments!: number;
}
