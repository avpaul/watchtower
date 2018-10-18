import fellowReducer from './fellowReducer';
import {
  LOAD_FELLOW_REQUEST,
  LOAD_FELLOW_SUCCESS,
  LOAD_FELLOW_FAILURE,
} from '../constants/fellowActionTypes';
import initialState from './initialState';

import fellows from '../../__mocks__/fellows';
import pagination from '../../__mocks__/pagination';

it('should return the initial state for unknown action type', () => {
  expect(fellowReducer(undefined, {})).toEqual(initialState.fellows);
});

it('should set loading state on fetching fellows', () => {
  const newState = {
    loading: true,
    error: null,
    fellows: [],
  };
  const action = { type: LOAD_FELLOW_REQUEST };
  expect(fellowReducer(undefined, action)).toMatchObject(newState);
});

it('should add fetched fellows to state', () => {
  const newState = {
    loading: false,
    fellows,
    pagination,
  };
  const action = {
    type: LOAD_FELLOW_SUCCESS,
    fellows,
    pagination,
  };

  expect(fellowReducer(undefined, action)).toMatchObject(newState);
});

it('should add the error message on failing to fetch fellows', () => {
  const newState = {
    loading: false,
    error: { message: 'error' },
    fellows: [],
  };
  const action = {
    type: LOAD_FELLOW_FAILURE,
    error: { message: 'error' },
  };

  expect(fellowReducer(undefined, action)).toMatchObject(newState);
});
