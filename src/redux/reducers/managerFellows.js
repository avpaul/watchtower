import initialState from './initialState';
import {
  LOAD_MANAGERFELLOWS_REQUEST,
  LOAD_MANAGERFELLOWS_SUCCESS,
  LOAD_MANAGERFELLOWS_FAILURE
} from '../constants/managerFellowTypes';
import genericReducer from './genericReducer';

const managerFellowReducer = (state = initialState.managerFellows, action) =>
  genericReducer(
    [
      LOAD_MANAGERFELLOWS_REQUEST,
      LOAD_MANAGERFELLOWS_SUCCESS,
      LOAD_MANAGERFELLOWS_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.managerFellowsSummary
    }
  );

export default managerFellowReducer;
