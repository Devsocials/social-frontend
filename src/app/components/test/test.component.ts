import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { increment, decrement, reset } from "./counter.actions";
import { Auth } from "../../common/auth";
import { ToastService } from "../../services/toast/toast.service";

@Component({
    selector: "app-test",
    templateUrl: "./test.component.html",
    styleUrl: "./test.component.css",
})
export class TestComponent implements OnInit {
    auth$: Observable<Auth>;
    constructor(private store: Store<{ auth: Auth }>, private toast: ToastService) {
        this.auth$ = store.select("auth");
    }
    // increment() {
    //   this.store.dispatch(increment({ payload: { incrementNumber: 1 } }));
    // }
    // decrement() {
    //   this.store.dispatch(decrement());
    // }
    // reset() {
    //   this.store.dispatch(reset());
    // }

    ngOnInit(): void {}

    trig() {
        this.toast.showToast(this.toast.TOAST_STATE.success, "HEYY", 3000);
    }
}
