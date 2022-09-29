import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CatsSelectors } from 'src/app/State/catState/selectors';
import { IState } from '../app/shared/interfaces';
import { setCatsPage } from '../app/State/catState/actions';

@Component({
  selector: 'app-cat-footer',
  templateUrl: './cat-footer.component.html',
  styleUrls: ['./cat-footer.component.css']
})
export class CatFooterComponent {
  total$ = this.store.select(CatsSelectors.selectTotalAndLimit).subscribe(value => {
    this.isVisible = value.total + 1 > value.limit
  })
  isVisible!: boolean;

  constructor(private store: Store<IState>) {}

  onChangePage($event: number) {
    this.store.dispatch(setCatsPage({ page: $event - 1 }));
  }
}
