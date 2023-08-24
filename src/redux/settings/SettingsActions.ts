import {createAction} from 'typesafe-actions';
import {createActionTypePrefixFormat} from '../common';

const typePrefixFormat = createActionTypePrefixFormat('settings');

const onSetRememberPW = createAction(typePrefixFormat('onSetRememberPW'))<{
  rememberPW: boolean;
}>();

const onSavecurrentPW = createAction(typePrefixFormat('onSavecurrentPW'))<{
  currentPW: string;
  user: string;
}>();

export const actions = {
  onSetRememberPW,
  onSavecurrentPW,
};
