import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IBreed, ICatImage } from '../interfaces';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  concatMap,
  filter,
  from,
  map,
  reduce,
  scan,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HtmlCatsService {
  private API_URL = 'https://api.thecatapi.com/v1/';
  private breeds = 'breeds';
//  private search = 'images/search?';


  constructor(private http: HttpClient, private store: Store) {}

  getBreeds(): Observable<IBreed[]> {
    return this.http.get<IBreed[]>(`${this.API_URL}${this.breeds}`)
  }
}
