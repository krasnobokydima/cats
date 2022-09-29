import { createReducer, on } from '@ngrx/store';
import { IState } from 'src/app/shared/interfaces';
import {
  getBreedsSuccess,
  getSearchCatsSuccess,
  setCatsBreedId,
  setCatsLimit,
  setCatsOrder,
  setCatsPage,
  setCatsTotal,
} from './actions';

const initialCatState: IState = {
  breeds: [],
  currentCatsArray: [],
  order: '',
  breed_ids: 'all',
  limit: 10,
  page: 0,
  total: 0,
};

export const catReducer = createReducer(
  initialCatState,
  on(getBreedsSuccess, (entries, { breeds }) => ({ ...entries, breeds })),
  on(getSearchCatsSuccess, (entries, { currentCatsArray }) => ({
    ...entries,
    currentCatsArray,
  })),

  on(setCatsBreedId, (entries, { breed_ids }) => ({ ...entries, breed_ids })),
  on(setCatsOrder, (entries, { order }) => ({ ...entries, order })),

  on(setCatsLimit, (entries, { limit }) => ({ ...entries, limit })),
  on(setCatsPage, (entries, { page }) => ({ ...entries, page })),
  on(setCatsTotal, (entries, { total }) => ({ ...entries, total })),
);
