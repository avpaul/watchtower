import initialState from '../initialState';
import fellowBioReducer from '../fellowBio';
import {
  LOAD_FELLOWBIO_REQUEST,
  LOAD_FELLOWBIO_SUCCESS,
  LOAD_FELLOWBIO_FAILURE
} from '../../constants/fellowBioTypes';

it('should return the initial state for unknown action type', () => {
  expect(fellowBioReducer(undefined, {})).toEqual({
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
  const action = { type: LOAD_FELLOWBIO_REQUEST };
  expect(fellowBioReducer(undefined, action)).toMatchObject(newState);
  expect(initialState).toEqual(initialState);
});

it('should add fetched fellow to state', () => {
  const newState = {
    loading: false,
    fellow: {}
  };
  const action = {
    type: LOAD_FELLOWBIO_SUCCESS,
    fellow: {}
  };

  expect(fellowBioReducer(undefined, action)).toMatchObject(newState);
});

it('should add the error message on failing to fetch fellow', () => {
  const newState = {
    loading: false,
    error: { message: 'error' },
    fellow: {}
  };
  const action = {
    type: LOAD_FELLOWBIO_FAILURE,
    error: { message: 'error' }
  };

  expect(fellowBioReducer(undefined, action)).toMatchObject(newState);
});
