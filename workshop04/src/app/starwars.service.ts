import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Model } from './model';

@Injectable()
export class StarWarsService {
    //Inject HttpClient
    constructor(private httpClient: HttpClient){

    }
    
    getItem(dataResult : Model) : Promise<any> {
        const url  = `https://swapi.co/api/${dataResult.category}/${dataResult.id}`;
        console.log("url", url);
        console.log(`${dataResult.category}`);
        return this.httpClient.get(url).toPromise();
    }

    getPicture(dataResult : Model) : Promise<any> {
        const url = `https://starwars-visualguide.com/assets/img/${dataResult.category}/${dataResult.id}.jpg`;
        console.log("url", url);
        return this.httpClient.get(url).toPromise();
    }

}