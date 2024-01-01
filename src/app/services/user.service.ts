import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../common/user";
import { Constants } from "../common/constants";
import { FollowAction } from "../common/follow-action";
import { Following } from "../common/following";

@Injectable({
    providedIn: "root",
})
export class UserService {
    constructor(private http: HttpClient) {}

    followUser(user: User, followingId: number, action: FollowAction): Observable<any> {
        return this.http.post<any>(Constants.baseUrl + `/user/${user.id}/follow`, {
            action: action,
            followingId: followingId,
        });
    }

    getFollowersByUserName(user: User, userName: any): Observable<Following[]> {
        return this.http.get<Following[]>(Constants.baseUrl + `/user/${user.id}/followers/${userName}`);
    }

    getFollowingByUserName(user: User, userName: any): Observable<Following[]> {
        return this.http.get<Following[]>(Constants.baseUrl + `/user/${user.id}/following/${userName}`);
    }

    searchUsersByName(user: User, name: string): Observable<Following[]> {
        return this.http.get<Following[]>(Constants.baseUrl + `/user/${user.id}/find/${name}`);
    }

    getUserByUserName(user: User, userName: any): Observable<User> {
        return this.http.get<User>(Constants.baseUrl + `/user/${user.id}/get-user/${userName}`);
    }
}
