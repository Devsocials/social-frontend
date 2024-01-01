import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { RouterModule } from "@angular/router";
import { AppRoutes } from "./app.routes";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { TimelineComponent } from "./components/timeline/timeline.component";
import { StoreModule } from "@ngrx/store";
import { BrowserModule } from "@angular/platform-browser";
import { TestComponent } from "./components/test/test.component";
import { authReducer } from "./store/reducers/auth.reducer";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HttpInterceptorService } from "./services/interceptor/http-interceptor.service";
import { ToastComponent } from "./components/toast/toast.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProfileComponent } from "./components/profile/profile.component";
import { UserPostComponent } from "./templates/user-pot/user-post/user-post.component";
import { PagewrapperComponent } from "./templates/wrappers/pagewrapper/pagewrapper.component";
import { NgIconsModule } from "@ng-icons/core";
import { faHeart, faComment } from "@ng-icons/font-awesome/regular";
import { faSolidHeart } from "@ng-icons/font-awesome/solid";
import { FollowersComponent } from './components/followers/followers.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowButtonComponent } from './templates/followButton/follow-button/follow-button.component';
import { DisplayPictureComponent } from './templates/display-picture/display-picture/display-picture.component';
import { UserFollowComponent } from './templates/user-follow/user-follow/user-follow.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NavbarComponent,
        TimelineComponent,
        TestComponent,
        ToastComponent,
        ProfileComponent,
        UserPostComponent,
        PagewrapperComponent,
        FollowersComponent,
        FollowingComponent,
        FollowButtonComponent,
        DisplayPictureComponent,
        UserFollowComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes),
        AppRoutingModule,
        StoreModule.forRoot({ auth: authReducer }),
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        NgIconsModule.withIcons({ faHeart, faSolidHeart, faComment }),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
