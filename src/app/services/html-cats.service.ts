import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IBreed, ICatState, IPaginationParams } from '../interfaces/interfaces';
import { map, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import randomItem from 'random-item';
import { setCatsTotal } from '../State/actions';
import { CatsSelectors } from '../State/selectors';

@Injectable({
  providedIn: 'root',
})
export class HtmlCatsService {
  private API_URL = 'https://api.thecatapi.com/v1/';
  params = { page: 0, limit: 10 };

  get paramsFromState() {
    let paramsFromState = { breed: '', order: '' };

    this.store
      .select(CatsSelectors.selectBreedIdAndOrder)
      .pipe(take(1))
      .subscribe((value) => (paramsFromState = value));

    return paramsFromState;
  }

  constructor(private http: HttpClient, private store: Store<ICatState>) {}

  getBreedsService(): Observable<IBreed[]> {
    return this.http.get<IBreed[]>(`${this.API_URL}breeds`);
  }

  getSearchCats(inputParams: Partial<IPaginationParams>): Observable<any> {
    this.params = {...this.params, ...inputParams};
    const params = {...this.params, ...this.paramsFromState}

    let queryParams = new HttpParams().append('limit', params['limit'])

    if (params['breed'] !== 'all' && params['breed'] !== '') {
      queryParams = queryParams.append('breed_ids', params['breed']);
    }

    if (params.page > 0) {
      queryParams = queryParams.append('page', params['page']);
    }

    if (params.order === 'Rand') {
      queryParams = queryParams.append('order', randomItem(['Ask, Desc']));
    }
    if (params.order === 'Asc' || params.order === 'Desc') {
      queryParams = queryParams.append('order', params['order']);
    }

    return this.http
      .get(`${this.API_URL}images/search`, {
        observe: 'response',
        params: queryParams,
      })
      .pipe(
        map((cats) => {
          const totalCats = cats.headers.get('pagination-count');

          if (totalCats !== null) {
            this.store.dispatch(setCatsTotal({ total: +totalCats }));
          }

          return cats.body;
        })
      );
  }
}
