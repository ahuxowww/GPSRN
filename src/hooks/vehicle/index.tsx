import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import R from 'ramda';
import {VehicleRedux} from '@src/redux/reducers';
import {actions} from '@src/redux/vehicle/VehicleActions';
import {AppThunkDispatch} from '@src/redux/common';

export const useVehicle = () => {
  const dispatch = useDispatch<AppThunkDispatch>();

  const getVehicle = useSelector(
    R.pipe(VehicleRedux.getReducerState, VehicleRedux.selectors.getVehicle),
  );

  const onChangeVehicle = React.useCallback(
    (payload: {vehicle: string}) => {
      dispatch(actions.saveVehicle(payload));
    },
    [dispatch],
  );

  return {
    getVehicle,
    onChangeVehicle,
  };
};
