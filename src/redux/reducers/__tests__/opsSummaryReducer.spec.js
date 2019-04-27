import opsSummaryReducer from '../opsSummaryReducer';
import {
  LOAD_OPS_SUMMARY_REQUEST,
  LOAD_OPS_SUMMARY_SUCCESS,
  LOAD_OPS_SUMMARY_FAILURE
} from '../../constants/managerActionTypes';
import initialState from '../initialState';
import fellowManagers from '../../../__mocks__/fellowManagers';

it('should return the initial state for unknown action type', () => {
  expect(opsSummaryReducer(undefined, {})).toEqual(initialState.opsSummary);
});

it('should set loading state on fetching managers', () => {
  const newState = {
    ...initialState.opsSummary,
    loading: true
  };
  const action = { type: LOAD_OPS_SUMMARY_REQUEST };
  expect(opsSummaryReducer(undefined, action)).toMatchObject(newState);
});

it('should add fetched managers to state', () => {
  const newState = {
    data: fellowManagers,
    loading: false
  };

  const action = {
    type: LOAD_OPS_SUMMARY_SUCCESS,
    data: fellowManagers
  };

  expect(opsSummaryReducer(undefined, action)).toMatchObject(newState);
});

it('should add the error message on failing to fetch managers', () => {
  const newState = {
    loading: false,
    error: { message: 'error' }
  };
  const action = {
    type: LOAD_OPS_SUMMARY_FAILURE,
    error: { message: 'error' }
  };

  expect(opsSummaryReducer(undefined, action)).toMatchObject(newState);
});
