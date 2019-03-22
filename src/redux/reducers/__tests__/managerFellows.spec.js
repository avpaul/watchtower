import initialState from '../initialState';
import managerFellowReducer from '../managerFellows';
import {
  LOAD_MANAGERFELLOWS_REQUEST,
  LOAD_MANAGERFELLOWS_SUCCESS,
  LOAD_MANAGERFELLOWS_FAILURE
} from '../../constants/managerFellowTypes';

it('should return the initial state for unknown action type', () => {
  expect(managerFellowReducer(undefined, {})).toEqual({
    loading: false,
    managerFellows: {},
    error: ''
  });
});

it('should set loading state on fetching manager fellows  data', () => {
  const newState = {
    loading: true,
    error: '',
    managerFellows: {}
  };
  const action = { type: LOAD_MANAGERFELLOWS_REQUEST };
  expect(managerFellowReducer(undefined, action)).toMatchObject(newState);
  expect(initialState).toEqual(initialState);
});

it('should add fetched anager fellows to state', () => {
  const newState = {
    loading: false,
    managerFellows: {}
  };
  const action = {
    type: LOAD_MANAGERFELLOWS_SUCCESS,
    managerFellows: {}
  };

  expect(managerFellowReducer(undefined, action)).toMatchObject(newState);
});

it('should add the error message on failing to fetch  manager fellows', () => {
  const newState = {
    loading: false,
    error: { message: 'error' },
    managerFellows: {}
  };
  const action = {
    type: LOAD_MANAGERFELLOWS_FAILURE,
    error: { message: 'error' }
  };

  expect(managerFellowReducer(undefined, action)).toMatchObject(newState);
});
