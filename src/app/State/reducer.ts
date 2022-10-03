import { createReducer, on } from '@ngrx/store';
import { ICatState } from 'src/app/interfaces/interfaces';
import {
  getBreedsSuccess,
  getSearchCatsSuccess,
  setCatsFormParams,
  setCatsTotal,
} from './actions';

const initialCatState: ICatState = {
  breeds: [],
  currentCatsArray: [],
  formParams: {
    order: '',
    breed: 'all',
  },
  total: 0,
};

export const catReducer = createReducer(
  initialCatState,
  on(getBreedsSuccess, (entries, { breeds }) => ({ ...entries, breeds })),
  on(getSearchCatsSuccess, (entries, { currentCatsArray }) => ({
    ...entries,
    currentCatsArray,
  })),

  on(setCatsFormParams, (entries, { formParams }) => ({ ...entries, formParams })),
  on(setCatsTotal, (entries, { total }) => ({ ...entries, total }))
);
