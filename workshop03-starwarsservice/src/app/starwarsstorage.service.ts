import { Injectable } from "@angular/core";

import Dexie from 'dexie';
import { Model } from "./model";

@Injectable()
export class StarWarsStorage {

    private db: Dexie;

    constructor(){
        //Create the database
        this.db = new Dexie('people');
        //Define the object store's schema
        this.db.version(2).stores({
            people:'id, name, birth_year, eye_color, gender, hair_color, height, mass, skin_color, homeworld, films, species, starships, vehicles, image, url, created, edited',
            planets:'id, name, diameter, rotation_period, orbital_period, gravity, population, climate, terrain, surface_water, residents, films, image, url, created, edited',
            starships: 'id, name, model,starship_class, manufacturer, cost_in_credits, length, crew, passengers, max_atmosphering_speed, hyperdrive_rating, MGLT, cargo_capacity, consumables, films, pilots, image, url, created, edited',
            vehicles: 'id, name, model, vehicle_class, manufacturer, length, cost_in_credits, crew, passengers, max_atmosphering_speed, cargo_capacity, consumables, films, pilots, image, url, created, edited',
            films: 'id, title, episode_id, opening_crawl, director, producer, release_date, species, starships, vehicles, characters, planets, image, url, created, edited',
            species: 'id, name, classification, designation, average_height, average_lifespan, eye_colors, hair_colors, skin_colors, language, homeworld, people, films, image, url, created, edited',
        });
    }


    addNewModel(dataResult : Model) : Promise<number> {
        console.log("add new model", dataResult);
        return this.db[dataResult.category].put(dataResult);
    }

    find(dataResult : Model): Promise<any> {
        console.log('Local cache <category>: ', dataResult.category);
        const p = new Promise<any>((resolve, reject) => {
            this.db[dataResult.category].where('id').equals(dataResult.id)
                .toArray()
                    .then(result => {
                        if(result.length > 0){
                            dataResult = result[0];
                            resolve(dataResult);
                        } else {
                            reject(dataResult);
                        }
                    });
        });
        return p;
    }

    // findAddress(pattern : any): Promise<Address[]> {
    //     return(
    //         this.db['contacts']
    //             .orderBy('name')
    //                 .filter(addr => {
    //                     return (pattern.test(addr.name));
    //                 })
    //                 .toArray()
    //     );
    // }
}