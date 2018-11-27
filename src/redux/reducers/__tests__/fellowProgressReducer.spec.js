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
    data: {
      fellowsProgressD0A: [],
      fellowsProgressD0B: [],
      fellowsProgressD0: []
    },
    error: null
  });
});

it('should set loading state on fetching cohort progress data', () => {
  const newState = {
    loading: true,
    error: null,
    data: {
      fellowsProgressD0A: [],
      fellowsProgressD0B: [],
      fellowsProgressD0: []
    }
  };
  const action = { type: LOAD_FELLOW_PROGRESS_REQUEST };
  expect(fellowProgressReducer(undefined, action)).toMatchObject(newState);
  expect(initialState).toEqual(initialState);
});

it('should add fetched  cohort progress to state', () => {
  const newState = {
    loading: false,
    data: {
      fellowsProgressD0B: [],
      fellowsProgressD0A: [],
      fellowsProgressD0: []
    }
  };
  const action = {
    type: LOAD_FELLOW_PROGRESS_SUCCESS,
    payload: {
      fellowsProgressD0B: [],
      fellowsProgressD0A: [],
      fellowsProgressD0: []
    }
  };

  expect(fellowProgressReducer(undefined, action)).toMatchObject(newState);
});

it('should add the error message on failing to fetch  cohort progres', () => {
  const newState = {
    loading: false,
    error: { message: 'error' },
    data: {
      fellowsProgressD0A: [],
      fellowsProgressD0B: [],
      fellowsProgressD0: []
    }
  };
  const action = {
    type: LOAD_FELLOW_PROGRESS_FAILURE,
    error: { message: 'error' }
  };

  expect(fellowProgressReducer(undefined, action)).toMatchObject(newState);
});
