import { User } from "./user";

export class Comment {
    comment!: string;
    user!: User;
    dateCreated!: Date;
}
