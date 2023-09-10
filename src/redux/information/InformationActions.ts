import {createAction} from 'typesafe-actions';
import {createActionTypePrefixFormat} from '../common';

const typePrefixFormat = createActionTypePrefixFormat('Information');

const saveInfomation = createAction(typePrefixFormat('saveInfomation'))<{
  speed: number;
  time: number;
  distance: number;
}>();

export const actions = {
  saveInfomation,
};
