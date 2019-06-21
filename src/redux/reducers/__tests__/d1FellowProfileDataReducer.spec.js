import initialState from '../initialState';
import d1FellowProfileDataReducer from '../d1FellowProfileDataReducer';
import {
  LOAD_D1_FELLOW_PROFILE_DATA_REQUEST,
  LOAD_D1_FELLOW_PROFILE_DATA_SUCCESS,
  LOAD_D1_FELLOW_PROFILE_DATA_FAILURE
} from '../../constants/d1FellowProfileDataTypes';

it('should return the initial state for unknown action type', () => {
  expect(d1FellowProfileDataReducer(undefined, {})).toEqual({
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
  const action = { type: LOAD_D1_FELLOW_PROFILE_DATA_REQUEST };
  expect(d1FellowProfileDataReducer(undefined, action)).toMatchObject(newState);
  expect(initialState).toEqual(initialState);
});

it('should add fetched fellow to state', () => {
  const newState = {
    loading: false,
    fellow: {}
  };
  const action = {
    type: LOAD_D1_FELLOW_PROFILE_DATA_SUCCESS,
    fellow: {}
  };

  expect(d1FellowProfileDataReducer(undefined, action)).toMatchObject(newState);
});

it('should add the error message on failing to fetch fellow', () => {
  const newState = {
    loading: false,
    error: { message: 'error' },
    fellow: {}
  };
  const action = {
    type: LOAD_D1_FELLOW_PROFILE_DATA_FAILURE,
    error: { message: 'error' }
  };

  expect(d1FellowProfileDataReducer(undefined, action)).toMatchObject(newState);
});
