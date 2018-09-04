import { Component } from '@angular/core';

import { LineItem } from './model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'workshop01-cart';

  cart: LineItem[] = [];

  processLineItem(lineItem : LineItem){
    this.cart.push(lineItem);
    console.log("cart= ", this.cart);
  }
}
