import initialState from '../initialState';
import fellowProfileDataReducer from '../fellowProfileDataReducer';
import {
  LOAD_FELLOW_PROFILE_DATA_REQUEST,
  LOAD_FELLOW_PROFILE_DATA_SUCCESS,
  LOAD_FELLOW_PROFILE_DATA_FAILURE
} from '../../constants/fellowProfileDataTypes';

it('should return the initial state for unknown action type', () => {
  expect(fellowProfileDataReducer(undefined, {})).toEqual({
    loading: false,
    fellow: {},
    error: ''
  });
});

it('should set loading state on fetching fellow data', () => {
  const newState = {
    loading: true,
    error: null,
    fellow: {}
  };
  const action = { type: LOAD_FELLOW_PROFILE_DATA_REQUEST };
  expect(fellowProfileDataReducer(undefined, action)).toMatchObject(newState);
  expect(initialState).toEqual(initialState);
});

it('should add fetched fellow to state', () => {
  const newState = {
    loading: false,
    fellow: {}
  };
  const action = {
    type: LOAD_FELLOW_PROFILE_DATA_SUCCESS,
    fellow: {}
  };

  expect(fellowProfileDataReducer(undefined, action)).toMatchObject(newState);
});

it('should add the error message on failing to fetch fellow', () => {
  const newState = {
    loading: false,
    error: { message: 'error' },
    fellow: {}
  };
  const action = {
    type: LOAD_FELLOW_PROFILE_DATA_FAILURE,
    error: { message: 'error' }
  };

  expect(fellowProfileDataReducer(undefined, action)).toMatchObject(newState);
});
