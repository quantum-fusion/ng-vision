import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { InputBoxComponent, InputBoxProperties } from "./input-box.component";

@Injectable()
export class InputBoxService {

    constructor(private modal: NgbModal) { }

    show(props: InputBoxProperties) {
        let modalRef = this.modal.open(InputBoxComponent);
        modalRef.componentInstance.properties = props;
        return modalRef.result.then(result => result, reason => reason);
    }
}