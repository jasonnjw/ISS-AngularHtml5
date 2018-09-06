import { Component, OnInit } from '@angular/core';
import { Address } from './model';
import { AddressService } from './address.service';
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'workshop02-address';

  currentAddr: Address[] = [];
  currentTab = 0;

  private tabs = [
    { label: 'A-E' , pattern: /^[a-e].*/i },
    { label: 'F-J' , pattern: /^[f-j].*/i },
    { label: 'K-O' , pattern: /^[k-o].*/i },
    { label: 'P-T' , pattern: /^[p-t].*/i },
    { label: 'U-Z' , pattern: /^[u-z].*/i }
  ];

  //svc is injected into the component
  constructor(private addressService: AddressService, private snackBar: MatSnackBar){
  }

  ngOnInit() {
    console.log('Initial load address: ');
    this.reloadAddress(this.tabs[0].pattern);
  }

  processAddress(address : Address){
    console.log('address: ', address);
    this. addressService.addNewAddress(address)
      .then(result => {
        //check if new address is visible under the current tab, if it is reload the tab...
        if(this.tabs[this.currentTab].pattern.test(address.name)){
          console.log("Reload Tab");
          this.reloadAddress(this.tabs[this.currentTab].pattern);
        }
        console.log("Saved: ", result);
        this.snackBar.open("Saved", 'Dismiss', {
          duration: 3000
        });
      }).catch(err => {
        console.error('err: ', err);
      });
  }

  loadAddress(event: MatTabChangeEvent){
    this.currentTab = event.index;
    const patt = this.tabs[event.index].pattern;
    console.log('event: ', patt, typeof(patt));
    this.reloadAddress(patt);
  }

  reloadAddress(pattern : RegExp){
    this.addressService.findAddress(pattern)
      .then(addr => {
        console.log('address: ', addr);
        this.currentAddr = addr;
      })
        .catch(err =>{
          console.error('err', err);
        })
  }
}
