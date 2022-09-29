import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IBreed, IPagination, ISearchParams, IState } from 'src/app/shared/interfaces';

const catsSelector = createFeatureSelector<IState>('catsStateKey'); //(state: State) => state

export namespace CatsSelectors {
  export const breedsList = createSelector(catsSelector, ({ breeds }: IState) =>
    breeds.map((breed: IBreed) => ({ id: breed.id, name: breed.name }))
  );
  export const selectCatsFromSearch = createSelector(
    catsSelector,
    (state: IState) => state.currentCatsArray
  );
  export const selectCatsTotal = createSelector(
    catsSelector,
    (state: IState) => state.total
  );
  export const selectCatsLimit = createSelector(
    catsSelector,
    (state: IState) => state.limit
  );
  export const selectCatsPage = createSelector(
    catsSelector,
    (state: IState) => state.page
  );

  export const selectSearchParamsValues = createSelector(
    catsSelector,
    (state: IState): ISearchParams => ({
      page: state.page,
      limit: state.limit,
      breed_ids: state.breed_ids,
      order: state.order,
    })
  );

  export const selectPagianationValues = createSelector(
    catsSelector,
    (state: IState): IPagination => ({
      page: state.page,
      limit: state.limit,
      total: state.total,
    })
  );

  export const selectTotalAndLimit = createSelector(
    catsSelector,
    (state: IState) => ({ total: state.total, limit: state.limit })
  )
}
