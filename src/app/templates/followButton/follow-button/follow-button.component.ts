import { Component, Input } from "@angular/core";
import { Following } from "../../../common/following";
import { UserService } from "../../../services/user.service";
import { User } from "../../../common/user";
import { FollowAction } from "../../../common/follow-action";
import { take } from "rxjs";

@Component({
    selector: "follow-button",
    templateUrl: "./follow-button.component.html",
    styleUrl: "./follow-button.component.css",
})
export class FollowButtonComponent {
    @Input() followingData!: Following;
    @Input() loggedInUser!: User;

    constructor(private userService: UserService) {}

    followUser(): void {
        const followAction: FollowAction = this.followingData.userFollowedByLoggedInUser ? FollowAction.UNFOLLOW : FollowAction.FOLLOW;
        this.userService
            .followUser(this.loggedInUser, this.followingData.user.id, followAction)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.followingData.userFollowedByLoggedInUser = !this.followingData.userFollowedByLoggedInUser;
                },
            });
    }
}
