import {createAction} from 'typesafe-actions';
import {createActionTypePrefixFormat} from '../common';

const typePrefixFormat = createActionTypePrefixFormat('App');

const setIsLoading = createAction(typePrefixFormat('setIsLoading'))<{
  isLoading: boolean;
}>();

export const actions = {
  setIsLoading,
};
