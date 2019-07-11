import initialState from './initialState';

import {
  GET_CERTIFICATION_REQUEST,
  GET_CERTIFICATION_SUCCESS,
  GET_CERTIFICATION_FAILURE
} from '../constants/certificationTypes';

import genericReducer from './genericReducer';

const getCertificationReducer = (
  state = initialState.getCertification,
  action
) =>
  genericReducer(
    [
      GET_CERTIFICATION_REQUEST,
      GET_CERTIFICATION_SUCCESS,
      GET_CERTIFICATION_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );

export default getCertificationReducer;
