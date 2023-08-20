import {AppThunk} from '@src/redux/common';
import {AuthServices} from '@src/infra';
import {actions} from './UserActions';

export const postLogin =
  (payload: any): AppThunk =>
  async (dispatch, _appState) => {
    try {
      console.log('postLogin Thunk 000>>>>', payload);
      const response = await AuthServices.postLogin(payload);
      console.log('postLogin Thunk >>>>', response);
      dispatch(actions.saveUser({user: response}));
      return response;
    } catch (e) {
      console.log('postLogin Thunk Err>>>>', e);
      throw e;
    }
  };
