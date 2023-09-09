import {createAction} from 'typesafe-actions';
import {createActionTypePrefixFormat} from '../common';

const typePrefixFormat = createActionTypePrefixFormat('Vehicle');

const saveVehicle = createAction(typePrefixFormat('saveVehicle'))<{
  vehicle: any;
}>();

export const actions = {
  saveVehicle,
};
