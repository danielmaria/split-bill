import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clean-table',
  templateUrl: './clean-table.component.html',
  styleUrls: ['./clean-table.component.scss']
})
export class CleanTableComponent {

  @Output() action = new EventEmitter<boolean>()
	constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.action.next(true)
    this.activeModal.close('Close click')
  }
}
