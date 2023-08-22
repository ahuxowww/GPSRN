import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import R from 'ramda';
import {UserRedux} from '@src/redux/reducers';
import {actions} from '@src/redux/user/UserActions';
import {AppThunkDispatch} from '@src/redux/common';

export const useUserLogin = () => {
  const dispatch = useDispatch<AppThunkDispatch>();

  const user = useSelector(
    R.pipe(UserRedux.getReducerState, UserRedux.selectors.getUserData),
  );

  const onLogout = React.useCallback(() => {
    dispatch(actions.logout());
  }, [dispatch]);

  return {
    onLogout,
    user,
  };
};
