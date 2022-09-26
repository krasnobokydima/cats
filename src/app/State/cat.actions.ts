import { createAction, props } from '@ngrx/store';
import { IBreed } from '../shared/interfaces';

export const getBreeds = createAction('[Cats] Get Breeds');
export const getBreedsSuccess = createAction(
  '[Cats] Get Breeds Success',
  (breeds: IBreed[]) => ({ breeds })
);

export const clearBreeds = createAction('[Cats] Clear Breeds');

export const changeSortValue = createAction(
  '[Cats] Change Breeds',
  props<{ sortDirection: string }>()
);
export const changeQuantitiesValue = createAction(
  '[Cats] Change quantity',
  props<{ quantity: number }>()
);
