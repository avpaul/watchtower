import fellowDevPulseReducer from './fellowDevPulseReducer';
import {
  LOAD_FELLOW_PULSE_REQUEST,
  LOAD_FELLOW_PULSE_SUCCESS,
  LOAD_FELLOW_PULSE_FAILURE
} from '../constants/fellowActionTypes';
import initialState from './initialState';

const avgRatings = {
  communication: 'N/A',
  integration: 'N/A',
  quantity: 'N/A',
  quality: 'N/A',
  professionalism: 'N/A',
  initiative: 'N/A'
};

it('should return the initial state for unknown action type', () => {
  expect(fellowDevPulseReducer(undefined, {})).toEqual(
    initialState.fellowDevPulse
  );
});

it('should set loading state on fetching fellow ratings', () => {
  const newState = {
    loading: true,
    error: null,
    ratings: [],
    averageRatings: avgRatings
  };
  const action = { type: LOAD_FELLOW_PULSE_REQUEST };
  expect(fellowDevPulseReducer(undefined, action)).toMatchObject(newState);
});

it('should add fetched fellow ratings to state', () => {
  const newState = {
    loading: false,
    ratings: [],
    averageRatings: avgRatings
  };
  const action = {
    type: LOAD_FELLOW_PULSE_SUCCESS,
    ratings: [],
    averageRatings: avgRatings
  };

  expect(fellowDevPulseReducer(undefined, action)).toMatchObject(newState);
});

it('should add the error message on failing to fetch fellow ratings', () => {
  const newState = {
    loading: false,
    error: { message: 'error' },
    ratings: [],
    averageRatings: avgRatings
  };
  const action = {
    type: LOAD_FELLOW_PULSE_FAILURE,
    error: { message: 'error' }
  };

  expect(fellowDevPulseReducer(undefined, action)).toMatchObject(newState);
});
