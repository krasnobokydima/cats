import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, tap } from 'rxjs';
import { IBreed, IState } from './shared/interfaces';
import { HtmlCatsService } from './shared/services/html-cats.service';
import { getBreedsSuccess } from './State/catState/actions';

@Injectable({
  providedIn: 'root',
})
export class CatsResolver implements Resolve<IBreed[]> {
  constructor(private httpService: HtmlCatsService, private store: Store) {}
  resolve(): Observable<IBreed[]> {
    return this.httpService.getBreedsService().pipe(tap((breeds) => {
      this.store.dispatch(getBreedsSuccess({breeds}))
    }))
  }
}
