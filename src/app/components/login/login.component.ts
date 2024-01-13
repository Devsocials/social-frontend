import { Component, OnInit } from "@angular/core";
import { User } from "../../common/user";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.css",
})
export class LoginComponent implements OnInit {
    signUpFormGroup!: FormGroup;

    constructor(private authService: AuthService) {}
    ngOnInit(): void {
        this.signUpFormGroup = new FormGroup({
            firstname: new FormControl("", Validators.required),
            lastname: new FormControl("", Validators.required),
            username: new FormControl("", Validators.required),
            email: new FormControl("", Validators.required),
            password: new FormControl("", Validators.required),
            confirmPassword: new FormControl("", Validators.required),
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
        const user = new User();
        user.email = this.signUpFormGroup.controls["email"].value;
        const password = this.signUpFormGroup.controls["password"].value;
        this.authService.login(user, password);
    }

    signup() {}
}
