import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IPagination, IState } from '../shared/interfaces';
import { CatsSelectors } from '../State/catState/selectors';

@Component({
  selector: 'app-cat-body',
  templateUrl: './cat-body.component.html',
  styleUrls: ['./cat-body.component.css']
})
export class CatBodyComponent implements OnDestroy {
  currentBreedImages$ = this.store.select(CatsSelectors.selectCatsFromSearch)
  pagination$ = this.store
    .pipe(select(CatsSelectors.selectPagianationValues))
    .subscribe((values) => (this.pagination = values));
  pagination!: IPagination;

  constructor(private store: Store<IState>) {}

  ngOnDestroy(): void {
    this.pagination$.unsubscribe()
  }
}
