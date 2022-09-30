import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, of} from 'rxjs';
import { getBreeds } from '../State/actions';
import { CatsSelectors } from '../State/selectors';

@Injectable({
  providedIn: 'root',
})
export class CatsResolver implements Resolve<boolean> {
  constructor(private store: Store) {}
  resolve(): Observable<boolean> {

    return this.store.select(CatsSelectors.breedsList).pipe(map(breeds => breeds.length > 0))
  }
}
