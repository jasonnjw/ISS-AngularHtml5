import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { StarWarsStorageService } from '../starwarsstorage.service';
import { Model } from '../model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar, private starwarstorageService : StarWarsStorageService) { 
  }

  canShare = false;

  dataResult : Model = {} as any;

  ngOnInit() {
    this.canShare = !!navigator['share'];
    const category = this.activatedRoute.snapshot.params.category;
    const id = parseInt(this.activatedRoute.snapshot.params.id);
    console.log(`urlParam: id = ${id}, category =${category}`);
    this.dataResult.id= id;
    this.dataResult.category=category;

    this.starwarstorageService.find(this.dataResult)
      .then(result => {
        this.dataResult=result;
        console.log('result: ', result);
      }).catch(err => {
          this.snackBar.open(`Result not found.`, 'Dismiss', {
            duration: 2000
          })
          .afterDismissed().toPromise()
            .then(() => {
            this.router.navigate(['/']);
          })
        });
  }

  share() {
    navigator['share']({
      title: `Star Wars!`,
      text: `I thought you might be interested in this!`,
      url: 'https://jasonnjw.github.io/ISS-AngularHtml5'
    })
  }

  redirectToRoot(){
    console.log("Redirect to root page");;
    this.router.navigate(['/']);
  }
  
  redirectToSearch(){
    console.log("Redirect to search page");;
    this.router.navigate(['/search']);
  }
}
