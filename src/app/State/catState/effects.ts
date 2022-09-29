import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { ICatImage } from 'src/app/shared/interfaces';
import { HtmlCatsService } from 'src/app/shared/services/html-cats.service';

import {
  getCurrentBreedCats,
  getSearchCatsSuccess,
} from './actions';

@Injectable()
export class CatEffects {
  constructor(private action$: Actions, private dataService: HtmlCatsService) {}

  loadCatsWithSearchParams$ = createEffect(() =>
    this.action$.pipe(
      ofType(getCurrentBreedCats),
      exhaustMap((params) =>
        this.dataService
          .getSearchCats(params)
          .pipe(
            map((currentCatsArray: ICatImage[]) =>
              getSearchCatsSuccess({ currentCatsArray })
            )
          )
      )
    )
  );
}
