import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, shareReplay } from 'rxjs';
import { ICatImage } from 'src/app/interfaces/interfaces';
import { HtmlCatsService } from 'src/app/services/html-cats.service';

import {
  getBreeds,
  getBreedsFail,
  getBreedsSuccess,
  getCurrentBreedCats,
  getSearchCatsSuccess,
} from './actions';

@Injectable()
export class CatEffects {
  constructor(private action$: Actions, private dataService: HtmlCatsService) {}

  getBreds$ = createEffect(() =>
    this.action$.pipe(
      ofType(getBreeds),
      exhaustMap(() =>
        this.dataService.getBreedsService().pipe(
          map((breeds) => getBreedsSuccess({ breeds })),
          shareReplay(1),
          catchError(() => of(getBreedsFail()))
        )
      )
    )
  );

  loadCatsWithSearchParams$ = createEffect(() =>
    this.action$.pipe(
      ofType(getCurrentBreedCats),
      exhaustMap((params) =>
        this.dataService.getSearchCats(params.params ?? {})
          .pipe(map((currentCatsArray: ICatImage[]) => getSearchCatsSuccess({ currentCatsArray })))
      )
    )
  );
}
