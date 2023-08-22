import {createAction} from 'typesafe-actions';
import {createActionTypePrefixFormat} from '../common';

const typePrefixFormat = createActionTypePrefixFormat('User');

const saveUser = createAction(typePrefixFormat('saveUser'))<{
  user: any;
}>();

const logout = createAction(typePrefixFormat('logout'))();

export const actions = {
  logout,
  saveUser,
};
