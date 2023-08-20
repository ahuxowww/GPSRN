import {createAction} from 'typesafe-actions';
import {createActionTypePrefixFormat} from '../common';

const typePrefixFormat = createActionTypePrefixFormat('User');

const saveUser = createAction(typePrefixFormat('saveUser'))<{
  user: any;
}>();

export const actions = {
  saveUser,
};
