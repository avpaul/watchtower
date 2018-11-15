import locationReducer from '../locationReducer';
import {
  LOAD_LOCATIONS_REQUEST,
  LOAD_LOCATIONS_SUCCESS,
  LOAD_LOCATIONS_FAILURE
} from '../../constants/locationsTypes';

it('should return the initial state for unknown action type', () => {
  expect(locationReducer(undefined, {})).toEqual({
    loading: false,
    locations: [],
    error: null
  });
});

it('should set loading state on fetching location data', () => {
  const newState = {
    loading: true,
    locations: [],
    error: null
  };
  const action = { type: LOAD_LOCATIONS_REQUEST };
  expect(locationReducer(undefined, action)).toMatchObject(newState);
});

it('should add fetched location to state', () => {
  const newState = {
    loading: false,
    locations: [],
    error: null
  };
  const action = {
    type: LOAD_LOCATIONS_SUCCESS,
    locations: [],
    error: null
  };

  expect(locationReducer(undefined, action)).toMatchObject(newState);
});

it('should add the error message on failing to fetch location', () => {
  const newState = {
    loading: false,
    error: { message: 'error' },
    locations: []
  };
  const action = {
    type: LOAD_LOCATIONS_FAILURE,
    error: { message: 'error' }
  };

  expect(locationReducer(undefined, action)).toMatchObject(newState);
});
