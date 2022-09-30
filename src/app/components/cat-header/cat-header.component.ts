import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, Subscription, tap } from 'rxjs';
import { ICatState, IFormParams} from 'src/app/interfaces/interfaces';
import { getCurrentBreedCats, setCatsFormParams } from 'src/app/State/actions';
import { CatsSelectors } from 'src/app/State/selectors';


@Component({
  selector: 'app-cat-header',
  templateUrl: './cat-header.component.html',
  styleUrls: ['./cat-header.component.css'],
})
export class CatHeaderComponent implements OnInit {
  breedsList$ = this.store.select(CatsSelectors.breedsList);
  changeForm$!: Subscription;

  form = this.fb.group({ breed: ['', Validators.required], order: ['', Validators.required]});

  constructor(private fb: FormBuilder, private store: Store<ICatState>) {}

  ngOnInit() {
    this.changeForm$ = this.form.valueChanges.pipe(
      tap(form => this.store.dispatch(setCatsFormParams({formParams: form as IFormParams}))),
      filter(form => Object.values(form).every(value => value?.length && value !==null)),
    ).subscribe(() => this.store.dispatch(getCurrentBreedCats({})))
  }

  ngOnDestroy(): void {
    this.changeForm$.unsubscribe();
  }
}
