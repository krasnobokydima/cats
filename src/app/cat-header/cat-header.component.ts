import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, merge, Subscription, tap } from 'rxjs';

import { IState } from '../shared/interfaces';
import { getCurrentBreedCats, setCatsBreedId, setCatsLimit, setCatsOrder } from '../State/catState/actions';
import { CatsSelectors } from '../State/catState/selectors';

@Component({
  selector: 'app-cat-header',
  templateUrl: './cat-header.component.html',
  styleUrls: ['./cat-header.component.css'],
})
export class CatHeaderComponent implements OnInit {
  breedsList$ = this.store.pipe(select(CatsSelectors.breedsList));
  page!: number;
  subscribes$: Subscription[] = [];
  data: any;

  orders = ['Asc', 'Desc', 'Rand'];
  limits = [1, 2, 4, 5, 10, 20];

  form = this.fb.group({
    breed: [null, Validators.required],
    order: [null, Validators.required],
    limit: [10]
  });

  constructor(private fb: FormBuilder, private store: Store<IState>, private route: ActivatedRoute) {}

  ngOnInit() {

    const breed$ = (this.form.get('breed') as FormControl);
    const order$ = (this.form.get('order') as FormControl);
    const limit$ = (this.form.get('limit') as FormControl);
    const page$ = this.store.select(CatsSelectors.selectCatsPage);

    const changeBreed$ = breed$.valueChanges.subscribe(value => this.store.dispatch(setCatsBreedId({breed_ids: value})))
    const changeOrder$ = order$.valueChanges.subscribe(value => this.store.dispatch(setCatsOrder({order: value})))
    const changeLimit$ = limit$.valueChanges.subscribe(value => this.store.dispatch(setCatsLimit({limit: value})))
    const getPage$ = page$.subscribe(page => this.page = page)

    const getCurrentCats$ = merge( breed$.valueChanges, limit$.valueChanges, order$.valueChanges, page$)
      .pipe(filter((_) => breed$.value && order$.value))
      .subscribe(() => {
        const params = {
          order: order$.value,
          breed_ids: breed$.value,
          limit: limit$.value,
          page: this.page,
        }

        return this.store.dispatch(getCurrentBreedCats({ params }))
      })

    this.subscribes$.push(changeBreed$, changeOrder$, changeLimit$, getCurrentCats$, getPage$);
  }

  ngOnDestroy(): void {
    this.subscribes$.forEach((sub) => sub.unsubscribe());
  }
}
