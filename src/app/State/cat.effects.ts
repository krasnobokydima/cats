import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, EmptyError, exhaustMap, map, tap } from "rxjs";
import { HtmlCatsService } from "../shared/services/html-cats.service";
import { getBreeds, getBreedsSuccess } from "./cat.actions";


@Injectable()
export class CatEffects {
  constructor(private action$: Actions, private dataService: HtmlCatsService) {}

  loadCatsBreeds$ = createEffect(() => this.action$.pipe(
    ofType(getBreeds),
    exhaustMap(() => this.dataService.getBreeds().pipe(
      map((breeds) => getBreedsSuccess(breeds)),
      catchError(() => EMPTY))
    ))
  )
}
