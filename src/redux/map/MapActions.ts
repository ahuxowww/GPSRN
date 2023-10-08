import {createAction} from 'typesafe-actions';
import {createActionTypePrefixFormat} from '../common';

const typePrefixFormat = createActionTypePrefixFormat('Map');

const saveSpeed = createAction(typePrefixFormat('saveSpeed'))<{
  speed: number;
}>();

const saveDistance = createAction(typePrefixFormat('saveDistance'))<{
  distance: number;
}>();

const saveStateMap = createAction(typePrefixFormat('saveState'))<{
  stateMap: number;
}>();

const saveDateMap = createAction(typePrefixFormat('saveDate'))<{
  date: Date;
}>();

export const actions = {
  saveSpeed,
  saveDistance,
  saveStateMap,
  saveDateMap,
};
