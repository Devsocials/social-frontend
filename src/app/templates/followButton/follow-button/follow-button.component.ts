import { Component, Input, OnInit } from "@angular/core";
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
export class FollowButtonComponent implements OnInit {
    @Input() followingData!: Following;
    @Input() loggedInUser!: User;

    constructor(private userService: UserService) {}
    ngOnInit(): void {
        // console.log("this.followingData", this.followingData);
        
    }
    

    followUser(): void {
        const followAction: FollowAction = this.followingData.isUserFollowedByLoggedInUser === "FOLLOWING" || this.followingData.isUserFollowedByLoggedInUser === "REQUESTED" ? FollowAction.UNFOLLOW : FollowAction.FOLLOW;
        this.userService
            .followUser(this.loggedInUser, this.followingData.user.id, followAction)
            .pipe(take(1))
            .subscribe({
                next: (data) => {
                    if (this.followingData.isUserFollowedByLoggedInUser === 'NOT_FOLLOWING' && data.followRequest === 'PENDING') {
                        this.followingData.isUserFollowedByLoggedInUser = "REQUESTED"
                    } else if (this.followingData.isUserFollowedByLoggedInUser === "REQUESTED") {
                        this.followingData.isUserFollowedByLoggedInUser = "NOT_FOLLOWING"
                    } else if (this.followingData.isUserFollowedByLoggedInUser === "FOLLOWING") {
                        this.followingData.isUserFollowedByLoggedInUser = "NOT_FOLLOWING"
                    } else {
                        this.followingData.isUserFollowedByLoggedInUser = "FOLLOWING"
                    }
                },
            });
    }
}
