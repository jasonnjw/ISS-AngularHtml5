import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms'

import { Address } from '../model'

@Component({
  selector: 'app-address-entry',
  templateUrl: './address-entry.component.html',
  styleUrls: ['./address-entry.component.css']
})
export class AddressEntryComponent implements OnInit {

  @Output()
  newAddress = new EventEmitter<Address>();

  constructor() { }

  ngOnInit() {
  }

  add(form : NgForm){
    console.log('form: ' , form.value);
    //Cast form.value Address
    this.newAddress.next(form.value as Address);
    //this.newAddress.next(<Address>form.value);
    form.resetForm();
  }

}
