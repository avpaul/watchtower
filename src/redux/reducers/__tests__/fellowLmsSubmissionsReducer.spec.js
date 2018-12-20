import fellowLmsSubmissionsReducer from '../fellowLmsSubmissionsReducer';
import {
  LOAD_FELLOW_LMS_SUBMISSIONS_REQUEST,
  LOAD_FELLOW_LMS_SUBMISSIONS_SUCCESS,
  LOAD_FELLOW_LMS_SUBMISSIONS_FAILURE
} from '../../constants/fellowActionTypes';

it('should return the initial state for unknown action type', () => {
  expect(fellowLmsSubmissionsReducer(undefined, {})).toEqual({
    loading: false,
    lmsSubmissions: [],
    error: null
  });
});

it('should set loading state on fetching submissions data', () => {
  const newState = {
    loading: true,
    error: null,
    lmsSubmissions: []
  };
  const action = { type: LOAD_FELLOW_LMS_SUBMISSIONS_REQUEST };
  expect(fellowLmsSubmissionsReducer(undefined, action)).toMatchObject(
    newState
  );
});

it('should add fetched submissions to state', () => {
  const newState = {
    loading: false,
    lmsSubmissions: [],
    error: null
  };
  const action = {
    type: LOAD_FELLOW_LMS_SUBMISSIONS_SUCCESS,
    lmsSubmissions: [],
    error: null
  };

  expect(fellowLmsSubmissionsReducer(undefined, action)).toMatchObject(
    newState
  );
});

it('should add the error message on failing to fetch submissions', () => {
  const newState = {
    loading: false,
    error: { message: 'error' },
    lmsSubmissions: []
  };
  const action = {
    type: LOAD_FELLOW_LMS_SUBMISSIONS_FAILURE,
    error: { message: 'error' }
  };

  expect(fellowLmsSubmissionsReducer(undefined, action)).toMatchObject(
    newState
  );
});
