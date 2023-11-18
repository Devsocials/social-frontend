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

@NgModule({
    declarations: [AppComponent, LoginComponent, NavbarComponent, TimelineComponent, TestComponent, ToastComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes),
        AppRoutingModule,
        StoreModule.forRoot({ auth: authReducer }),
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
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
