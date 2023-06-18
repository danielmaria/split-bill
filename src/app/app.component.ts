import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { auditTime, fromEvent, Observable } from 'rxjs';
import { ItemModelComponent, Item } from './components/item-model/item-model.component';

export interface DraggableOptions {
  zones?: Array<string>;
  data?: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  itens: Item[] = []
  bill: Map<string, Item[]> = new Map

  @ViewChild('itemDraggable', {static: true}) messagesElementRef?: ElementRef;


  constructor(private modalService: NgbModal) {
    // fromEvent(this.messagesElementRef?.nativeElement, 'touchmove', {passive: true}).pipe(auditTime(500))
  //   .subscribe((event: any) => this.scrollEventCalculator(event));
  }

  //itemDraggable

  ngOnInit() {

  }


	open() {
		let model = this.modalService.open(ItemModelComponent);
    model.componentInstance.itens.subscribe(($e: any) => {
      this.itens.push($e)
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

    if (this.bill.has(person)) {
      const numberArray = this.bill.get(person);
      numberArray?.push(item!);
    } else {
      this.bill.set(person, [item!]);
    }
  }

  calculateSum(values: Item[]): number {
    return values.map(i => i.value).reduce((a, b) => a + b, 0);
  }

  revert(person: string) {
    this.bill.get(person)?.pop()
  }

}