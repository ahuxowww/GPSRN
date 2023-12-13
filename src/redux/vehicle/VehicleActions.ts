import {createAction} from 'typesafe-actions';
import {createActionTypePrefixFormat} from '../common';

const typePrefixFormat = createActionTypePrefixFormat('Vehicle');

const saveVehicle = createAction(typePrefixFormat('saveVehicle'))<{
  vehicle: any;
}>();

const setStartJourney = createAction(typePrefixFormat('setStartJourney'))<{
  active: boolean;
}>();

export const actions = {
  saveVehicle,
  setStartJourney
};
