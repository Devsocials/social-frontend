import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { TestComponent } from "./components/test/test.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { LoginguardService } from "./services/route-guards/loginguard.service";
import { FollowersComponent } from "./components/followers/followers.component";

export const AppRoutes: Routes = [
    {
        path: "timeline",
        loadChildren: () => import("./modules/timeline/timeline.module").then((m) => m.TimelineModule),
    },
    { path: "login", component: LoginComponent },
    { path: "test", component: TestComponent },
    { path: ":username", component: ProfileComponent, canActivate: [LoginguardService] },
    { path: ":username/followers", component: FollowersComponent, canActivate: [LoginguardService] },
];
