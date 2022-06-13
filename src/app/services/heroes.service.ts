import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HeroeModel } from '../models/heroe.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://login-app-c6b7d-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {

  }

  crearHeroe(heroe: HeroeModel){
    return this.http.post(`${ this.url }/heroes.json`, heroe).pipe(
      map((resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    )
  }

  actualizarHeroe(heroe: HeroeModel){

    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroeTemp);
  }


  getHeroes(){
    return this.http.get(`${ this.url }/heroes.json`)
      .pipe(
        map( resp => this.crearArreglo(resp))
      );
  }

  private crearArreglo(heroesObj: object){

    if( heroesObj === null ){
      return [];
    }

    const heroes: HeroeModel[] = [];

    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
    })

    return heroes;
  }


  getHeroe(id: String){
    return this.http.get(`${ this.url }/heroes/${ id }.json`)
  }

  borrarHeroe(id: String){
    return this.http.delete(`${ this.url }/heroes/${ id }.json`)
  }


}
