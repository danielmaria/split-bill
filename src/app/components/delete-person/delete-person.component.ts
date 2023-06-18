import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-person',
  templateUrl: './delete-person.component.html',
  styleUrls: ['./delete-person.component.scss']
})
export class DeletePersonComponent {

  @Output() action = new EventEmitter<boolean>()
  @Input() owner?: string
  
	constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.action.next(true)
    this.activeModal.close('Close click')
  }

}
