import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../common/post";
import { HttpClient } from "@angular/common/http";
import { Constants } from "../common/constants";
import { User } from "../common/user";
import { Comment } from "../common/comment";

@Injectable({
    providedIn: "root",
})
export class PostService {
    constructor(private http: HttpClient) {}

    getPostsByUsername(user: User, username: any): Observable<Post[]> {
        return this.http.get<Post[]>(Constants.baseUrl + `/user/${user.id}/post/all/${username}`);
    }

    getCommentsByPostId(user: User, postId: number): Observable<Comment[]> {
        return this.http.get<Comment[]>(Constants.baseUrl + `/user/${user.id}/post/${postId}/allcomments`);
    }

    addComment(user: User, postId: number, comment: Comment): Observable<any> {
        return this.http.post<any>(Constants.baseUrl + `/user/${user.id}/post/${postId}/comment`, comment);
    }

    likePost(user: User, postId: number, action: string): Observable<any> {
        return this.http.post<any>(Constants.baseUrl + `/user/${user.id}/post/${postId}/like`, { action: action });
    }
}
