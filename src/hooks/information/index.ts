import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import R from 'ramda';
import {InformationRedux} from '@src/redux/reducers';
import {actions} from '@src/redux/information/InformationActions';
import {AppThunkDispatch} from '@src/redux/common';
import {Information} from '@src/redux/information/InformationRedux';

export const useConnectInformation = () => {
  const dispatch = useDispatch<AppThunkDispatch>();

  const getInformation = useSelector(
    R.pipe(
      InformationRedux.getReducerState,
      InformationRedux.selectors.getConnectInformation,
    ),
  );

  const onChangeInformation = React.useCallback(
    (payload: Information) => {
      dispatch(actions.saveInfomation(payload));
    },
    [dispatch],
  );

  return {
    getInformation,
    onChangeInformation,
  };
};
