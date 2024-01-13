import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { TestComponent } from "./components/test/test.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { LoginguardService } from "./services/route-guards/loginguard.service";
import { FollowersComponent } from "./components/followers/followers.component";
import { FollowingComponent } from "./components/following/following.component";
import { FollowRequestsComponent } from "./components/follow-requests/follow-requests.component";

export const AppRoutes: Routes = [
    {
        path: "timeline",
        loadChildren: () => import("./modules/timeline/timeline.module").then((m) => m.TimelineModule),
        canActivate: [LoginguardService],
    },
    { path: "login", component: LoginComponent },
    { path: "test", component: TestComponent },
    { path: "profile/:username", component: ProfileComponent, canActivate: [LoginguardService] },
    { path: "profile/:username/followers", component: FollowersComponent, canActivate: [LoginguardService] },
    { path: "profile/:username/following", component: FollowingComponent, canActivate: [LoginguardService] },
    { path: "profile/:username/follow-requests", component: FollowRequestsComponent, canActivate: [LoginguardService] },
    { path: "**", redirectTo: "/timeline", pathMatch: "full" },
    { path: "", redirectTo: "/timeline", pathMatch: "full" },
];
