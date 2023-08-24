import {perfixReducer} from '@src/config/app_config';
import {Action} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

const reducerPrefixFormat = (_key: string) =>
  `${perfixReducer}/${_key}_reducer/`.toUpperCase();

export const createActionTypePrefixFormat = (
  prefix: string,
): ((name: string) => string) => {
  const actionTypePrefixFormat = (type: string): string => {
    return reducerPrefixFormat(prefix) + type;
  };

  return actionTypePrefixFormat;
};

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  any,
  undefined,
  Action<string>
>;

export type AppThunkDispatch = ThunkDispatch<any, undefined, Action<string>>;
