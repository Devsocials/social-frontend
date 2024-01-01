import { Component, Input } from "@angular/core";
import { User } from "../../../common/user";
import { Following } from "../../../common/following";

@Component({
    selector: "user-follow",
    templateUrl: "./user-follow.component.html",
    styleUrl: "./user-follow.component.css",
})
export class UserFollowComponent {
    @Input() loggedInUser!: User;
    @Input() searchedUser!: Following;
}
