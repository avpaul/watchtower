import fellowCountHistoryReducer from './fellowCountHistoryReducer';
import {
  LOAD_FELLOW_COUNT_HISTORY_REQUEST,
  LOAD_FELLOW_COUNT_HISTORY_SUCCESS,
  LOAD_FELLOW_COUNT_HISTORY_FAILURE
} from '../constants/fellowCountHistory';
import initialState from './initialState';

import countSummary from '../../__mocks__/countSummary';

it('should return the initial state for unknown action type', () => {
  expect(fellowCountHistoryReducer(undefined, {})).toEqual(
    initialState.fellowCountHistory
  );
});

it('should set loading state on fetching history', () => {
  const newState = {
    loading: true,
    error: null
  };
  const action = { type: LOAD_FELLOW_COUNT_HISTORY_REQUEST };
  expect(fellowCountHistoryReducer(undefined, action)).toMatchObject(newState);
});

it('should add fetched history to state', () => {
  const newState = {
    loading: false,
    countSummary
  };
  const action = {
    type: LOAD_FELLOW_COUNT_HISTORY_SUCCESS,
    countSummary
  };

  expect(fellowCountHistoryReducer(undefined, action)).toMatchObject(newState);
});

it('should add the error message on failing to fetch history', () => {
  const newState = {
    loading: false,
    error: { message: 'error' },
    countSummary: {}
  };
  const action = {
    type: LOAD_FELLOW_COUNT_HISTORY_FAILURE,
    error: { message: 'error' }
  };

  expect(fellowCountHistoryReducer(undefined, action)).toMatchObject(newState);
});
