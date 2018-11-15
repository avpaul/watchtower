import fellowProgressReducer from '../fellowProgressReducer';
import initialState from '../initialState';
import {
  LOAD_FELLOW_PROGRESS_REQUEST,
  LOAD_FELLOW_PROGRESS_SUCCESS,
  LOAD_FELLOW_PROGRESS_FAILURE
} from '../../constants/fellowProgressTypes';

it('should return the initial state for unknown action type', () => {
  expect(fellowProgressReducer(undefined, {})).toEqual({
    loading: false,
    fellowsProgressD0A: [],
    fellowsProgressD0B: [],
    error: null
  });
});

it('should set loading state on fetching cohort progress data', () => {
  const newState = {
    loading: true,
    error: null,
    fellowsProgressD0A: [],
    fellowsProgressD0B: []
  };
  const action = { type: LOAD_FELLOW_PROGRESS_REQUEST };
  expect(fellowProgressReducer(undefined, action)).toMatchObject(newState);
  expect(initialState).toEqual(initialState);
});

it('should add fetched  cohort progress to state', () => {
  const newState = {
    loading: false,
    fellowsProgressD0B: [],
    fellowsProgressD0A: []
  };
  const action = {
    type: LOAD_FELLOW_PROGRESS_SUCCESS,
    fellowsProgressD0B: [],
    fellowsProgressD0A: []
  };

  expect(fellowProgressReducer(undefined, action)).toMatchObject(newState);
});

it('should add the error message on failing to fetch  cohort progres', () => {
  const newState = {
    loading: false,
    error: { message: 'error' },
    fellowsProgressD0A: [],
    fellowsProgressD0B: []
  };
  const action = {
    type: LOAD_FELLOW_PROGRESS_FAILURE,
    error: { message: 'error' }
  };

  expect(fellowProgressReducer(undefined, action)).toMatchObject(newState);
});
