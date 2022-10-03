import { createAction, props } from '@ngrx/store';
import { IBreed, ICatImage, IFormParams, IPaginationParams } from '../interfaces/interfaces';

export const getBreeds = createAction('[Cats] Get breeds');
export const getBreedsSuccess = createAction('[Cats] Get breeds success', props<{ breeds: IBreed[] }>());
export const getBreedsFail = createAction('[Cats] Get breeds fail');

export const getCurrentBreedCats = createAction('[Cats] Get current cats breed', props<{ params?: IPaginationParams }>())
export const getSearchCatsSuccess = createAction('[Cats] Get search cats success', props<{ currentCatsArray: ICatImage[] }>())

export const setCatsFormParams = createAction('[Cats] Set cats form params', props<{ formParams: IFormParams }>())
export const setCatsTotal = createAction('[Cats] Set cats total', props<{ total: number }>())
