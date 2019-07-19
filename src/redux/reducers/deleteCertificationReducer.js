import initialState from './initialState';
import * as types from '../constants/cadreCertificationTypes';
import genericReducer from './genericReducer';

export default (state = initialState.deleteCertification, action) =>
  genericReducer(
    [
      types.DELETE_CERTIFICATION_REQUEST,
      types.DELETE_CERTIFICATION_SUCCESS,
      types.DELETE_CERTIFICATION_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );
