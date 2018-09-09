import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material';

import { Model } from '../model';
import { StarWarsStorageService } from '../starwarsstorage.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

private categories : any = [
    { label: 'Planets', value:'planets', imageSrc:'planets' },
    { label: 'Starships', value:'starships', imageSrc:'starships' },
    { label: 'Vehicles', value:'vehicles', imageSrc:'vehicles' },
    { label: 'People', value:'people',imageSrc:'characters' },
    { label: 'Films', value:'films', imageSrc:'films' },
    { label: 'Species', value:'species', imageSrc:'species' }
    ];    
    
  @Input()
  data : Model[] = [];

  constructor(private starwarstorageService : StarWarsStorageService, private router: Router) { }

  allData : Model[] = [];

  ngOnInit() {
    this.reloadData(this.categories[0].value);
  }

  loadData(event: MatTabChangeEvent){
    const retrieveModel = this.categories[event.index].value;
    console.log('retrieveModel: ', retrieveModel);
    this.reloadData(retrieveModel);
  }

  reloadData(category: string){
    this.starwarstorageService.getAll(category)
    .then(allResult => {
        this.allData = allResult;
        console.log('On Init', this.allData);
    }
    ).catch(err => {
        console.error('err', err);
    });
  }
  
  redirectToCard(category : string, id : number){
    console.log("Redirect to card page", category, id);;
    this.router.navigate(['/card', category, id ]);
  }
}
