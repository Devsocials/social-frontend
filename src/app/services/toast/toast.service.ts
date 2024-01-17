import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ToastService {
    TOAST_STATE: ToastState = {
        success: "success-toast",
        warning: "warning-toast",
        danger: "danger-toast",
        info: "info-toast",
    };

    public showToast$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public toastMessage$: BehaviorSubject<string> = new BehaviorSubject<string>("Some message");
    public toastState$: BehaviorSubject<string> = new BehaviorSubject<string>(this.TOAST_STATE.success);

    constructor() {}

    showToast(toastState: string, toastMsg: string, time: number): void {
        this.toastState$.next(toastState);
        this.toastMessage$.next(toastMsg);
        this.showToast$.next(true);
        this.dismissToast(time);
    }

    dismissToast(time: number): void {
        setTimeout(() => {
            this.showToast$.next(false);
        }, time);
    }
}

interface ToastState {
    success: string;
    warning: string;
    danger: string;
    info: string;
}
