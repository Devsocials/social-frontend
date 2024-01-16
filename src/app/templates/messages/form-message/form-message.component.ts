import { Component, Input } from "@angular/core";

@Component({
    selector: "message",
    templateUrl: "./form-message.component.html",
    styleUrl: "./form-message.component.css",
})
export class FormMessageComponent {

    @Input() type: 'success' | 'danger' | 'warning' | 'info' = 'info';
    @Input() message: string = "This is a message"
}
