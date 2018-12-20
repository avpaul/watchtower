import fellowLmsSummaryReducer from '../fellowLmsSummaryReducer';
import {
  LOAD_FELLOW_LMS_SUMMARY_REQUEST,
  LOAD_FELLOW_LMS_SUMMARY_SUCCESS,
  LOAD_FELLOW_LMS_SUMMARY_FAILURE
} from '../../constants/fellowActionTypes';

it('should return the initial state for unknown action type', () => {
  expect(fellowLmsSummaryReducer(undefined, {})).toEqual({
    loading: false,
    lmsSummary: [],
    error: null
  });
});

it('should set loading state on fetching lms summary', () => {
  const newState = {
    loading: true,
    error: null,
    lmsSummary: []
  };
  const action = { type: LOAD_FELLOW_LMS_SUMMARY_REQUEST };
  expect(fellowLmsSummaryReducer(undefined, action)).toMatchObject(newState);
});

it('should add fetched lms submissions to state', () => {
  const newState = {
    loading: false,
    lmsSummary: [],
    error: null
  };
  const action = {
    type: LOAD_FELLOW_LMS_SUMMARY_SUCCESS,
    lmsSummary: [],
    error: null
  };

  expect(fellowLmsSummaryReducer(undefined, action)).toMatchObject(newState);
});

it('should add the error message on failing to fetch lms summary', () => {
  const newState = {
    loading: false,
    error: { message: 'error' },
    lmsSummary: []
  };
  const action = {
    type: LOAD_FELLOW_LMS_SUMMARY_FAILURE,
    error: { message: 'error' }
  };

  expect(fellowLmsSummaryReducer(undefined, action)).toMatchObject(newState);
});
