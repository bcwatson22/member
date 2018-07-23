import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from './../modal.component';

@Component({
  selector: 'bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})

export class BillComponent extends ModalComponent {

  // The BillComponent is a special juan, as it is of the type ModalComponent and therefore 'extends' the modal's class. When we do this
  // we have to call super() in the constructor otherwise it will error! The BillComponent has two inputs, the bill that the user has
  // clicked (which defines the content of the modal) and the current user (which is used to build the path to the bill PDF). It has one
  // output which is called when either the modal background or modal close are clicked, and emits an event up to the parent component
  // (BillsComponent) which tells it to update the modal animation states and change the history API (manipulating the browser URL).

  // One thing worth noticing here is the use of a custom pipe to format content - see {{bill?.total | multiply:5:1}} in the HTML. Custom
  // pipes are like Handlebars Helpers in that they take a piece of data or content, edit it based on logic, and then return the formatted
  // value back into the template. The MultiplyPipe takes two parameters, calls an inbuilt NG pipe 'CurrencyPipe' and then returns a
  // multiplied and rounded value - in this case 20% for VAT purposes. Pipes are used whenever you see the '|' within interpolated data.
  @Input() bill: any;
  @Input() user: string;
  @Output() modalClose = new EventEmitter<any>();

  constructor() {
    super();
  }

  ngOnInit() {
  }

  closeModal(activeBill: any): void {

    this.modalClose.emit(activeBill);

  }

}
