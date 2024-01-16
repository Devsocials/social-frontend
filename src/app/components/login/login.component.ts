import { Component, OnInit } from "@angular/core";
import { User } from "../../common/user";
import { FormGroup, Validators, FormControl, AsyncValidatorFn, AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.css",
})
export class LoginComponent implements OnInit {
    signUpFormGroup!: FormGroup;
    loginFormGroup!: FormGroup;
    userNameAvailable: boolean = true;
    emailAvailable: boolean = true;

    constructor(private authService: AuthService) {}
    ngOnInit(): void {
        this.signUpFormGroup = new FormGroup({
            firstName: new FormControl("", [Validators.required]),
            lastName: new FormControl("", [Validators.required]),
            userName: new FormControl("", [Validators.required], [this.usernameValidator()]),
            email: new FormControl("", [Validators.required], [this.emailValidator()]),
            password: new FormControl("", [Validators.required]),
            confirmPassword: new FormControl("", [Validators.required, this.passwordValidator()]),
        });

        this.loginFormGroup = new FormGroup({
            email: new FormControl("", []),
            password: new FormControl("", [])
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
        user.email = this.loginFormGroup.controls["email"].value;
        const password = this.loginFormGroup.controls["password"].value;
        this.authService.login(user, password);
    }

    signup() {
        this.authService.signup(this.signUpFormGroup.value);
    }

    emailCheck(): void {
        this.authService.emailCheck(this.signUpFormGroup.controls["email"].value).subscribe({
            next: (data) => (this.emailAvailable = data),
        });
    }

    usernameValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return this.authService.userNameCheck(control.value).pipe(
                map((res) => {
                    if (res) {
                        this.userNameAvailable = false;
                    }
                    return res ? { usernameExists: true } : null;
                }),
            );
        };
    }

    emailValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return this.authService.emailCheck(control.value).pipe(
                map((res) => {
                    if (res) {
                        this.emailAvailable = false;
                    }
                    return res ? { emailExists: true } : null;
                }),
            );
        };
    }

    passwordValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            return control?.value === this.signUpFormGroup?.controls["password"]?.value
                ? null
                : { differentPasswords: true };
        };
    }
}
