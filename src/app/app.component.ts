import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { auditTime, fromEvent, Observable } from 'rxjs';
import { CleanTableComponent } from './components/clean-table/clean-table.component';
import { DeletePersonComponent } from './components/delete-person/delete-person.component';
import { ItemModelComponent, Item } from './components/item-model/item-model.component';
import { ManagePeopleComponent } from './components/manage-people/manage-people.component';

export interface DraggableOptions {
  zones?: Array<string>;
  data?: any;
}

export class Bill {
  owner?: string;
  itens?: Item[]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  itens: Item[] = []
  bills: Bill[]

  @ViewChild('itemDraggable', {static: true}) messagesElementRef?: ElementRef;

  constructor(private modalService: NgbModal) {
    let storageBills = localStorage.getItem('bill')
    if (storageBills) {
      this.bills = JSON.parse(storageBills)
      this.itens = JSON.parse(localStorage.getItem('itens') || '[]')
    } else {
      this.bills = []
    }
  }

  cleanTable() {
    let model = this.modalService.open(CleanTableComponent);
    model.componentInstance.action.subscribe(($e: any) => {
      localStorage.clear()
      this.bills = []
      this.itens = []
    })
  }

  managePeople() {
    let model = this.modalService.open(ManagePeopleComponent);
    model.componentInstance.people.subscribe(($e: string) => {
      let newBill = {owner: $e, itens: []}
      this.bills.push(newBill)
      this.updateLocalStorage()
    })
  }

  delete(billOwner: string) {
    let model = this.modalService.open(DeletePersonComponent);
    model.componentInstance.owner = billOwner
    model.componentInstance.action.subscribe(($e: string) => {
      this.bills = this.bills.filter(b => b.owner !== billOwner)
      this.updateLocalStorage()
    })
  }

	addItem() {
		let model = this.modalService.open(ItemModelComponent);
    model.componentInstance.itens.subscribe(($e: any) => {
      this.itens.push($e)
      localStorage.setItem('itens', JSON.stringify(this.itens))
    })
	}

  onDragStart(event: DragEvent) {
    if (event.target instanceof HTMLElement) {
      event.dataTransfer?.setData('text/plain', event.target.textContent || '');
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, person: string) {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text/plain');
    const item = {icon: data!.split('/')[1], value: parseFloat(data!.split('/')[2]), datetime: new Date()} as Item
    let personsBill = this.bills.find(b => b.owner === person)
    if (personsBill) {
      personsBill.itens?.push(item!)
    } else {
      this.bills.push({owner: person, itens: [item!]});
    }
    this.updateLocalStorage()
  }

  updateLocalStorage() {
    localStorage.setItem('bill', JSON.stringify(this.bills))
  }

  calculateSum(values: Item[] | undefined): number {
    if (!values) {
      return 0
    }
    return values.map(i => i.value).reduce((a, b) => a + b, 0);
  }

  revert(person: string) {
    let bill = this.bills.filter(b => b.owner === person)
    bill[0]?.itens?.pop()
  }

}