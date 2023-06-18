import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


export interface Item {
  icon: string
  datetime?: Date
  value: number
}

@Component({
  selector: 'app-item-model',
  templateUrl: './item-model.component.html',
  styleUrls: ['./item-model.component.scss']
})
export class ItemModelComponent {
  value: FormControl = new FormControl('');

  @Output() itens = new EventEmitter<Item>()
	constructor(public activeModal: NgbActiveModal) {}

  addItem(icon: string) {
    if (this.value.value) {
      const item = {icon: icon, value: this.value.value}
      this.itens.emit(item)
      this.activeModal.close('Close click')
    }
  }
}
