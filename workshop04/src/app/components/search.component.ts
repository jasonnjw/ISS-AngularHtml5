import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { StarWarsService } from '../starwars.service';
import { StarWarsStorageService } from '../starwarsstorage.service';
import { Model } from '../model';
import { Planet } from '../planet';
import { Starship } from '../starship';
import { Vehicle } from '../vehicle';
import { People } from '../people';
import { Film } from '../film';
import { Species } from '../species';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private starwarService : StarWarsService, private starwarstorageService : StarWarsStorageService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  private redirect : boolean = false;

  private categories : any = [
    { label: 'Planets', value:'planets', imageSrc:'planets' },
    { label: 'Starships', value:'starships', imageSrc:'starships' },
    { label: 'Vehicles', value:'vehicles', imageSrc:'vehicles' },
    { label: 'People', value:'people',imageSrc:'characters' },
    { label: 'Films', value:'films', imageSrc:'films' },
    { label: 'Species', value:'species', imageSrc:'species' }
  ];

  dataResult : Model = {} as any;

  search(form : NgForm){
    switch (form.value.category.value) {
      case 'planets':
          this.dataResult =  {} as Planet;
          break;
      case 'starships':
          this.dataResult =  {} as Starship;
          break;
      case 'vehicles':
          this.dataResult =  {} as Vehicle;
          break;
      case 'people':
          this.dataResult =  {} as People;
          break;
      case 'films':
          this.dataResult =  {} as Film;
          break;
      case 'species':
          this.dataResult =  {} as Species;
          break;
      default:
          this.dataResult = {} as Model;
  }

  //initialise
  this.dataResult.id=form.value.number;
  this.dataResult.category = form.value.category.value;
  
  //find cache before search/save
  // const category = form.value.category.value;
  // const src = form.value.category.imageSrc;

  console.log("processing form", this.dataResult.category, this.dataResult.id);
  //retrieve from cache
  this.starwarstorageService.find(this.dataResult)
    .then(result => {
      console.log('from cache', result); 
      this.dataResult=result;
      this.redirectToCard(this.dataResult.category, this.dataResult.id);
      throw false;
    }, err => {
      console.error(err, 'unable to find from cache, retrieving from web');
      //retrieve online
      //this.starwarService.getItem(category, id)
      return err;
    }).then(this.starwarService.getItem.bind(this.starwarService))
        .then(result => {
          //store into local cache
          // this.starwarstorageService.addNewModel(this.dataResult);
          console.log('from internet', result); 
          this.dataResult=result;
          this.dataResult.id=form.value.number;
          this.dataResult.category = form.value.category.value;
          this.dataResult.image = `https://starwars-visualguide.com/assets/img/${form.value.category.imageSrc}/${form.value.number}.jpg`;
          console.log('after merge', this.dataResult);
          this.redirectToCard(this.dataResult.category, this.dataResult.id);
          return this.dataResult;
          })
            .then(this.starwarstorageService.addNewModel.bind(this.starwarstorageService))
                .catch(error  => {
                  console.error("error: ", error);
                  this.dataResult = {} as Model;
                  console.log("length" , Object.getOwnPropertySymbols(this.dataResult).length);
                  if(error != false ){
                    this.snackBar.open("You're unlucky, no result found", 'Dismiss', {
                      duration: 3000
                      });
                  }
                });
  }

redirectToRoot(){
  console.log("Redirect to root page");;
  this.router.navigate(['/']);
}

redirectToCard(category : string, id : number){
  console.log("Redirect to card page", category, id);;
  this.router.navigate(['/card', category, id ]);
}
}
