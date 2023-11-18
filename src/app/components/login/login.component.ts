import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Auth } from "../../common/auth";
import { User } from "../../common/user";
import { login } from "../../store/actions/auth.action";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.css",
})
export class LoginComponent implements OnInit {
    signUpFormGroup!: FormGroup;

    auth$: Observable<Auth>;
    constructor(private store: Store<{ auth: Auth }>, private authService: AuthService) {
        this.auth$ = store.select("auth");
    }
    ngOnInit(): void {
        this.signUpFormGroup = new FormGroup({
            username: new FormControl("", Validators.required),
            email: new FormControl("", Validators.required),
            password: new FormControl("", Validators.required),
            confrimPassword: new FormControl("", Validators.required),
        });
    }

    signUp: boolean = true;

    stateStyleTrue: string =
        "w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white";

    stateStyleFalse: string =
        "w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300";

    changeSignUpState(state: boolean) {
        this.signUp = state;
    }

    login() {
        const auth = new Auth();
        auth.isUserAuthenticated = true;
        const user = new User();
        user.name = "Madhur Sharma";
        auth.user = user;
        this.store.dispatch(login({ payload: { loginData: auth } }));
    }

    submit() {
      
        console.log(this.signUpFormGroup.controls["email"].value);
    }
}
