import {createAction} from 'typesafe-actions';
import {createActionTypePrefixFormat} from '../common';
import {GeoLocation} from '@src/domain/map/type';

const typePrefixFormat = createActionTypePrefixFormat('location');

const onSetLocation = createAction(typePrefixFormat('onSetLocation'))<{
  location: any;
}>();

const setCurrentUserLocation = createAction(
  typePrefixFormat('setCurrentUserLocation'),
)<{location?: GeoLocation}>();

export const actions = {
  onSetLocation,
  setCurrentUserLocation,
};
