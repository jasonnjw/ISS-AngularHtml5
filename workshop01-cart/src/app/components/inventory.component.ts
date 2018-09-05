import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { NgForm } from '@angular/forms';

import { LineItem } from '../model';

interface Fruit{
  image: string;
  label: string;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  @Output()
  newLineItem = new EventEmitter<LineItem>();

  fruitsList : Fruit[] = [
    {image: "assets/fruits/acorn_squash.png", label: "Acorn Squash"},
    {image: "assets/fruits/apple.png", label: "Apple"},
    {image: "assets/fruits/lettuce.png", label: "Lettuce"},
    {image: "assets/fruits/squash.png", label: "Squash"}
  ]

  fruitImg ="";
  selectedFruit ="";

  constructor() { }

  ngOnInit() {
  }

  displayFruit(event : any) {
    this.fruitImg = this.fruitsList[event.target.value].image;
    this.selectedFruit = this.fruitsList[event.target.value].label;
    console.log("FruitImg = " + this.fruitImg + "Selected Fruit = " + this.selectedFruit);
  }

 add(form : NgForm){
   console.log("form: " , form.value);
   //construct the payload
   const lineItem: LineItem = {
     label: this.selectedFruit,
     quantity: form.value.quantity
   }
   //fire the event with the payload
   this.newLineItem.next(lineItem);

   //reset data
   form.resetForm();
   this.selectedFruit = "";
   this.fruitImg = "";
  }
}
