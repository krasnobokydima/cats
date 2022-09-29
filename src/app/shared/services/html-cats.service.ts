import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IBreed, ISearchParams } from '../interfaces';
import { map, Observable, Subscription } from 'rxjs';
import { State, Store } from '@ngrx/store';
import { CatsSelectors } from 'src/app/State/catState/selectors';
import { setCatsTotal } from 'src/app/State/catState/actions';
import randomItem from 'random-item';

@Injectable({
  providedIn: 'root',
})
export class HtmlCatsService {
  private API_URL = 'https://api.thecatapi.com/v1/';
  private breeds = 'breeds';
  private imageSearch = 'images/search';

  constructor(private http: HttpClient, private store: Store) {}

  getBreedsService(): Observable<IBreed[]> {
    const url = this.API_URL + this.breeds;

    return this.http.get<IBreed[]>(url);
  }

  getSearchCats({ params }: { params: ISearchParams }): Observable<any> {
    let url = this.API_URL + this.imageSearch;
    let queryParams = new HttpParams().append('limit', params['limit'])

    console.log('br id: ', params.breed_ids !== 'all', params)

    if (params.breed_ids !== 'all') {
      queryParams = queryParams.append('breed_ids', params['breed_ids'])
    }

    if (params.page > 0) {
      queryParams = queryParams.append('page', params['page'])
    }

    if (params.order === 'Rand') {
      queryParams = queryParams.append('order', randomItem(['Ask, Desc']))
    } else {
      queryParams = queryParams.append('order', params['order'])
    }

    return this.http
      .get(url, {
        observe: 'response',
        params: queryParams,
      })
      .pipe(
        map((cats) => {
          const totalCats = cats.headers.get('pagination-count');
          console.log(cats.url)

          if (totalCats !== null) {
            this.store.dispatch(setCatsTotal({ total: +totalCats }));
          }

          return cats.body;
        })
      );
  }
}
