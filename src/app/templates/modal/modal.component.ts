import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "app-modal",
    templateUrl: "./modal.component.html",
    styleUrl: "./modal.component.css",
})
export class ModalComponent {
    @Input() openModal: boolean = false;
    @Output() openModalChange = new EventEmitter<boolean>();
    @Output() onModalConfirm = new EventEmitter<any>();

    closeModalFunc() {
        this.openModalChange.emit();
    }
    onConfirm() {
        this.onModalConfirm.emit();
    }
}
