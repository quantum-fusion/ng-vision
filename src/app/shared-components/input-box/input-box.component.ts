import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'input-box',
    templateUrl: 'input-box.component.html'
})
export class InputBoxComponent implements OnInit {
    public inputValue: string;
    public properties: InputBoxProperties;

    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit() { }

    ok() {
        this.activeModal.close(this.inputValue);
    }
}

export class InputBoxProperties {
    title: string;
    label: string;
}