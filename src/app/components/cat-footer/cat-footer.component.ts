import {
  AfterViewInit,
  Component,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';
import { getCurrentBreedCats } from 'src/app/State/actions';
import { CatsSelectors } from 'src/app/State/selectors';
import { ICatState } from '../../interfaces/interfaces';
import { pageSizeOptions, initialPageSize } from 'src/app/constants/store';

@Component({
  selector: 'app-cat-footer',
  templateUrl: './cat-footer.component.html',
  styleUrls: ['./cat-footer.component.css'],
})
export class CatFooterComponent implements OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  total$ = this.store.select(CatsSelectors.selectTotalLength);
  subscription$!: Subscription;
  pageSizeOptions = pageSizeOptions;
  initialPageSize = initialPageSize;
  constructor(private store: Store<ICatState>) {}

  ngAfterViewInit(): void {
    this.subscription$ = this.paginator.page.pipe(tap(console.log)).subscribe(({ pageIndex, pageSize }) => {
      const params = { page: pageIndex, limit: pageSize }

      this.store.dispatch(getCurrentBreedCats({ params }));
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
