import { state, style, trigger, transition, animate } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { ToastService } from "../../services/toast/toast.service";

@Component({
    selector: "app-toast",
    templateUrl: "./toast.component.html",
    styleUrl: "./toast.component.css",
    animations: [
        trigger("toastTrigger", [
            state("open", style({ transform: "translateX(0%)" })),
            state("close", style({ transform: "translateX(-200%)" })),
            transition("open <=> close", [animate("300ms ease-in-out")]),
        ]),
    ],
})
export class ToastComponent implements OnInit {
    // toastClass!: string[];
    // toastMessage!: string;
    // showToast!: boolean;

    constructor(public toast: ToastService) {}

    ngOnInit(): void {
        // setTimeout(() => {
        //     this.showToast = true;
        // }, 1000);
    }
}
