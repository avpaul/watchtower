import managerReducer from './managerReducer';
import {
  LOAD_MANAGER_REQUEST,
  LOAD_MANAGER_SUCCESS,
  LOAD_MANAGER_FAILURE
} from '../constants/managerActionTypes';
import initialState from './initialState';
import fellowManagers from '../../__mocks__/fellowManagers';

it('should return the initial state for unknown action type', () => {
  expect(managerReducer(undefined, {})).toEqual(initialState.managers);
});

it('should set loading state on fetching managers', () => {
  const newState = {
    ttls: [],
    lfs: [],
    averageFellowsPerTtl: 0,
    averageFellowsPerLf: 0,
    loading: true,
    error: null
  };
  const action = { type: LOAD_MANAGER_REQUEST };
  expect(managerReducer(undefined, action)).toMatchObject(newState);
});

it('should add fetched managers to state', () => {
  const newState = {
    ...fellowManagers,
    loading: false
  };
  const action = {
    type: LOAD_MANAGER_SUCCESS,
    managers: fellowManagers
  };

  expect(managerReducer(undefined, action)).toMatchObject(newState);
});

it('should add the error message on failing to fetch managers', () => {
  const newState = {
    loading: false,
    error: { message: 'error' }
  };
  const action = {
    type: LOAD_MANAGER_FAILURE,
    error: { message: 'error' }
  };

  expect(managerReducer(undefined, action)).toMatchObject(newState);
});
