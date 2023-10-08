import {createAction} from 'typesafe-actions';
import {createActionTypePrefixFormat} from '../common';

const typePrefixFormat = createActionTypePrefixFormat('location');

const onSetLatitude = createAction(typePrefixFormat('onSetLatitude'))<{
  lat: number;
}>();

const onSetLongitude = createAction(typePrefixFormat('onSetLongitude'))<{
  lon: number;
}>();

export const actions = {
  onSetLatitude,
  onSetLongitude,
};
