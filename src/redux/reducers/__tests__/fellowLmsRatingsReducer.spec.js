import initialState from '../initialState';
import fellowLmsRatingsReducer from '../fellowLmsRatingsReducer';
import {
  LOAD_FELLOW_LMS_RATINGS_REQUEST,
  LOAD_FELLOW_LMS_RATINGS_SUCCESS,
  LOAD_FELLOW_LMS_RATINGS_FAILURE
} from '../../constants/fellowLmsRatings';
import lmsData from '../../../__mocks__/lmsRatings';

it('should return the initial state for unknown action type', () => {
  expect(fellowLmsRatingsReducer(undefined, {})).toEqual({
    loading: false,
    data: {},
    error: null
  });
});

it('should set loading state on fetching lms ratings data', () => {
  const newState = {
    loading: true,
    error: null
  };
  const action = { type: LOAD_FELLOW_LMS_RATINGS_REQUEST };
  expect(fellowLmsRatingsReducer(undefined, action)).toMatchObject(newState);
  expect(initialState).toEqual(initialState);
});

it('should add fetched lms ratings to state', () => {
  const newState = {
    loading: false,
    data: lmsData
  };
  const action = {
    type: LOAD_FELLOW_LMS_RATINGS_SUCCESS,
    lmsRatings: lmsData
  };

  expect(fellowLmsRatingsReducer(undefined, action)).toMatchObject(newState);
});

it('should add the error message on failing to fetch lms ratings', () => {
  const newState = {
    loading: false,
    error: { message: 'error' },
    data: {}
  };
  const action = {
    type: LOAD_FELLOW_LMS_RATINGS_FAILURE,
    error: { message: 'error' }
  };

  expect(fellowLmsRatingsReducer(undefined, action)).toMatchObject(newState);
});
