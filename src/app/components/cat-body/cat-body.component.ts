import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ICatState } from '../../interfaces/interfaces';
import { CatsSelectors } from '../../State/selectors';

@Component({
  selector: 'app-cat-body',
  templateUrl: './cat-body.component.html',
  styleUrls: ['./cat-body.component.css'],
})
export class CatBodyComponent {
  currentBreedImages$ = this.store.select(CatsSelectors.selectCatsFromSearch);
  constructor(private store: Store<ICatState>) {}
}
