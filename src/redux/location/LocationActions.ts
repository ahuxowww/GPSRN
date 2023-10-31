import {createAction} from 'typesafe-actions';
import {createActionTypePrefixFormat} from '../common';
import {GeoLocation} from '@src/domain/map/type';

const typePrefixFormat = createActionTypePrefixFormat('location');

const onSetLatitude = createAction(typePrefixFormat('onSetLatitude'))<{
  lat: number;
}>();

const onSetLongitude = createAction(typePrefixFormat('onSetLongitude'))<{
  lon: number;
}>();

const setCurrentUserLocation = createAction(
  typePrefixFormat('setCurrentUserLocation'),
)<{location?: GeoLocation}>();

export const actions = {
  onSetLatitude,
  onSetLongitude,
  setCurrentUserLocation,
};
