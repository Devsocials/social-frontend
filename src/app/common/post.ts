import { User } from "./user";

export class Post {
    id!: number;
    postUrl!: string;
    caption!: string;
    location!: string;
    user!: User;
    noOfLikes!: number;
    noOfComments!: number;
    likedByUser!: boolean;
}
