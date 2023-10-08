import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import R from 'ramda';
import {MapRedux} from '@src/redux/reducers';
import {actions} from '@src/redux/map/MapActions';
import {AppThunkDispatch} from '@src/redux/common';

export const useConnectMap = () => {
  const dispatch = useDispatch<AppThunkDispatch>();

  const getSpeed: number = useSelector(
    R.pipe(MapRedux.getReducerState, MapRedux.selectors.getSpeed),
  );

  const onChangeSpeedMap = React.useCallback(
    (payload: {speed: number}) => {
      dispatch(actions.saveSpeed(payload));
    },
    [dispatch],
  );

  const getDistance: number = useSelector(
    R.pipe(MapRedux.getReducerState, MapRedux.selectors.getDistance),
  );

  const onChangeDistanceMap = React.useCallback(
    (payload: {distance: number}) => {
      dispatch(actions.saveDistance(payload));
    },
    [dispatch],
  );

  const getStateMap: number = useSelector(
    R.pipe(MapRedux.getReducerState, MapRedux.selectors.getStateMap),
  );

  const onChangeStateMap = React.useCallback(
    (payload: {stateMap: number}) => {
      dispatch(actions.saveStateMap(payload));
    },
    [dispatch],
  );

  const getDateMap: Date = useSelector(
    R.pipe(MapRedux.getReducerState, MapRedux.selectors.getDate),
  );

  const onChangeDateMap = React.useCallback(
    (payload: {date: Date}) => {
      dispatch(actions.saveDateMap(payload));
    },
    [dispatch],
  );

  return {
    getSpeed,
    onChangeSpeedMap,
    getDistance,
    onChangeDistanceMap,
    getStateMap,
    onChangeStateMap,
    getDateMap,
    onChangeDateMap,
  };
};
