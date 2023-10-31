import {createAction} from 'typesafe-actions';
import {createActionTypePrefixFormat} from '../common';

const typePrefixFormat = createActionTypePrefixFormat('User');

const saveUser = createAction(typePrefixFormat('saveUser'))<{
  user: any;
}>();

const saveFolowUser = createAction(typePrefixFormat('saveFolowUser'))<{
  followUser: boolean;
}>();

const saveUserData = createAction(typePrefixFormat('saveUserData'))<{
  userData: any;
}>();

const logout = createAction(typePrefixFormat('logout'))();

export const actions = {
  logout,
  saveUser,
  saveFolowUser,
  saveUserData
};
