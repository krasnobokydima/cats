import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBreed, ICatState } from 'src/app/interfaces/interfaces';
import { catsStateKey } from '../constants/store';

const catsSelector = createFeatureSelector<ICatState>(catsStateKey);

export namespace CatsSelectors {
  export const breedsList = createSelector(
    catsSelector,
    ({ breeds }: ICatState) => breeds.map((breed: IBreed) => ({ id: breed.id, name: breed.name }))
  );
  export const selectCatsFromSearch = createSelector(catsSelector, (state: ICatState) => state.currentCatsArray);
  export const selectTotalLength = createSelector(catsSelector, (state: ICatState) => state.total);
  export const selectBreedIdAndOrder = createSelector(catsSelector, (state: ICatState) => (state.formParams));
}
