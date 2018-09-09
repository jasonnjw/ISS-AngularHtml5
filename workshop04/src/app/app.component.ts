import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor (private router: Router){
  }
  searchDisabled : boolean = false;

  ngOnInit(){
  }

  title = 'workshop04';

  onSearchClick(){
    console.log("Search button clicked.");
    this.searchDisabled = true;
    this.router.navigate(['/search']);
  }

  onHomeClick(){
    console.log("Home button clicked.");
    this.searchDisabled = false;
    this.router.navigate(['/']);
  }

}
