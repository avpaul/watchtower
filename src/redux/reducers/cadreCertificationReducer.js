import initialState from './initialState';
import * as types from '../constants/cadreCertificationTypes';
import genericReducer from './genericReducer';

const fetchCertificationsReducer = (
  state = initialState.allCetifications,
  action
) =>
  genericReducer(
    [
      types.FETCH_CERTIFICATION_REQUEST,
      types.FETCH_CERTIFICATION_SUCCESS,
      types.FETCH_CERTIFICATION_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );

export default fetchCertificationsReducer;
