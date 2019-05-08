import performanceDataReducer from '../performanceDataReducer';
import {
  FETCH_PERFORMANCE_DATA_REQUEST,
  FETCH_PERFORMANCE_DATA_SUCCESS,
  FETCH_PERFORMANCE_DATA_FAILURE
} from '../../constants/performanceTypes';
import initialState from '../initialState';

it('should return the initial state for unknown action type', () => {
  expect(performanceDataReducer(undefined, {})).toEqual({
    loading: false,
    data: initialState.performanceData.data,
    error: ''
  });
});

it('should set loading state on fetching fellows performance data', () => {
  const action = { type: FETCH_PERFORMANCE_DATA_REQUEST };
  expect(performanceDataReducer(undefined, action)).toMatchObject({
    ...initialState.performanceData,
    loading: true
  });
});

it('should add fetched fellows performance data to state', () => {
  const action = {
    type: FETCH_PERFORMANCE_DATA_SUCCESS,
    data: {
      today: { keys: [], data: [] },
      trend: { keys: [], data: [] }
    }
  };

  const newState = {
    ...initialState.performanceData,
    data: action.data
  };

  expect(performanceDataReducer(undefined, action)).toMatchObject(newState);
});

it('should add the error message on failing to fetch fellows performance data', () => {
  const action = {
    type: FETCH_PERFORMANCE_DATA_FAILURE,
    error: { message: 'error' }
  };

  const newState = {
    ...initialState.performanceData,
    error: action.error
  };

  expect(performanceDataReducer(undefined, action)).toMatchObject(newState);
});
