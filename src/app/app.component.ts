import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ICatImage, IState } from './shared/interfaces';
import { HtmlCatsService } from './shared/services/html-cats.service';
import { getBreeds } from './State/cat.actions';

import { CatsSelectors } from './State/cat.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  breedsList$ = this.store.pipe(select(CatsSelectors.breedsList));
  currentBreedImage: Partial<ICatImage> = {};

  form = this.fb.group({
    breed: [{ value: null, disabled: true }, Validators.required],
    sortDirection: [null, Validators.required],
    quantity: [10, Validators.required],
  });

  constructor(
    private httpCats: HtmlCatsService,
    private fb: FormBuilder,
    private store: Store<IState>
  ) {}

  click() {
    this.httpCats.getBreeds()
    this.store.dispatch(getBreeds())
  }

  click2() {
    this.breedsList$.subscribe((res) => console.log(res))
  }

  get breed() {
    return this.form.get('breed') as FormControl;
  }
  get imageAlt() {
    return `Photo of a ${this.breed.value}`;
  }
}
