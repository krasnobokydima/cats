import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IState } from '../shared/interfaces';

export const catStateSelector = createFeatureSelector<IState>('catState');

export namespace CatsSelectors {
  export const AllBreeds = createSelector(
    catStateSelector,
    (state: IState) => state.breeds
  );

  export const breedsList = createSelector(catStateSelector, (state: IState) =>
    state.breeds.map((breed) => ({ id: breed.id, name: breed.name }))
  );

  export const allQuantities = createSelector(
    catStateSelector,
    (state: IState) => state.quantities.values
  );

  export const currentQuantity = createSelector(
    catStateSelector,
    (state) => state.quantities.currentValue
  );

  export const allSortDirections = createSelector(
    catStateSelector,
    (state) => state.sortDirection
  );

  export const currentSortDirection = createSelector(
    catStateSelector,
    (state) => state.sortDirection.currentValue
  );
}
