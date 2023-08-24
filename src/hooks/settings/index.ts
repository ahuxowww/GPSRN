import {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import R from 'ramda';

import {SettingRedux} from '@src/redux/reducers';
import {actions} from '@src/redux/settings/SettingsActions';

export const useSettings = () => {
  const dispatch = useDispatch();

  const isRememberPW = useSelector(
    R.pipe(SettingRedux.getReducerState, SettingRedux.selectors.getRememberPW),
  );

  const currentPW = useSelector(
    R.pipe(SettingRedux.getReducerState, SettingRedux.selectors.getCurrentPW),
  );

  const currentUser = useSelector(
    R.pipe(SettingRedux.getReducerState, SettingRedux.selectors.getCurrentUser),
  );

  const rememberedUser = useMemo(() => {
    if (isRememberPW && currentPW && currentUser) {
      return {password: currentPW, user: currentUser};
    } else {
      return {password: '', user: ''};
    }
  }, [currentPW, currentUser, isRememberPW]);

  const onSetRememberPW = useCallback(
    (payload: {rememberPW: boolean}) =>
      dispatch(actions.onSetRememberPW(payload)),
    [dispatch],
  );

  const onSetcurrentUserInfo = useCallback(
    (payload: {currentPW: string; user: string}) =>
      dispatch(actions.onSavecurrentPW(payload)),
    [dispatch],
  );

  return {
    rememberedUser,
    isRememberPW,
    currentPW,
    onSetRememberPW,
    onSetcurrentUserInfo,
  };
};
