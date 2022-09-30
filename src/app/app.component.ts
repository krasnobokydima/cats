import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getBreeds, getCurrentBreedCats } from './State/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getBreeds())
    this.store.dispatch(getCurrentBreedCats({}))
  }
}
