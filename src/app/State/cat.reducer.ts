import { createReducer, on } from '@ngrx/store';
import { changeQuantitiesValue, changeSortValue, clearBreeds, getBreeds, getBreedsSuccess } from './cat.actions';

const initialState = {
  breeds: [],
  sortDirection: {
    currentValue: null,
    values: ['Rand', 'Desc', 'Asc']
  },
  quantities: {
    currentValue: 10,
    values: [1, 2, 4, 5, 10, 20]
  }
};

const clone = (obj: object) => JSON.parse(JSON.stringify(obj));

export const catReducer = createReducer(
  initialState,
  on(clearBreeds, (state) => { return {...state, breeds: []} }),
  on(getBreedsSuccess, (entries, { breeds }) => {
    const entriesClone = clone(entries);
    entriesClone.breeds = breeds;

    return entriesClone;
  }),
  on(changeSortValue, (entries, value) => {
    const entriesClone = clone(entries);
    entriesClone.sortDirection.currentValue = value;

    return entriesClone;
  }),
  on(changeQuantitiesValue, (entries, value) => {
    const entriesClone = clone(entries);
    entriesClone.quantities.currentValue = value;

    return entriesClone;
  })
);
