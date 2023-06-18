import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-people',
  templateUrl: './manage-people.component.html',
  styleUrls: ['./manage-people.component.scss']
})
export class ManagePeopleComponent {

  // TODO: Change it
  person: FormControl = new FormControl('');

  @Output() people = new EventEmitter<boolean>()
	constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.people.next(this.person.value)
    this.activeModal.close('Close click')
  }
}
