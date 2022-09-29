import { createAction, props } from '@ngrx/store';
import { IBreed, ICatImage, ISearchParams } from '../../shared/interfaces';

export const getBreedsSuccess = createAction('[Cats] Get breeds success', props<{ breeds: IBreed[] }>());

export const getCurrentBreedCats = createAction('[Cats] Get current cats breed', props<{ params: ISearchParams }>())
export const getSearchCatsSuccess = createAction('[Cats] Get search cats success', props<{ currentCatsArray: ICatImage[] }>())

export const setCatsBreedId = createAction('[Cats] Set cats total', props<{ breed_ids: string }>())
export const setCatsOrder = createAction('[Cats] Set cats total', props<{ order: string }>())

export const setCatsLimit = createAction('[Cats] Set cats limit', props<{ limit: number }>())
export const setCatsPage = createAction('[Cats] Set cats page', props<{ page: number }>())
export const setCatsTotal = createAction('[Cats] Set cats total', props<{ total: number }>())
