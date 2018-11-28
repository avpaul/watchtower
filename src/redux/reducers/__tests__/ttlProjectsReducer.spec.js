import ttlProjectsReducer from '../ttlProjectsReducer';
import {
  TTL_PROJECTS_REQUEST,
  TTL_PROJECTS_SUCCESS,
  TTL_PROJECTS_FAILURE
} from '../../constants/ttlTypes';

it('should return the initial state for unknown action type', () => {
  expect(ttlProjectsReducer(undefined, {})).toEqual({
    loading: false,
    projects: [],
    error: null
  });
});

it('should set loading state on fetching projects data', () => {
  const newState = {
    loading: true,
    error: null,
    projects: []
  };
  const action = { type: TTL_PROJECTS_REQUEST };
  expect(ttlProjectsReducer(undefined, action)).toMatchObject(newState);
});

it('should add fetched ttl projects to state', () => {
  const newState = {
    loading: false,
    projects: [],
    error: null
  };
  const action = {
    type: TTL_PROJECTS_SUCCESS,
    projects: [],
    error: null
  };

  expect(ttlProjectsReducer(undefined, action)).toMatchObject(newState);
});

it('should add the error message on failing to fetch ttl projects', () => {
  const newState = {
    loading: false,
    error: { message: 'error' },
    projects: []
  };
  const action = {
    type: TTL_PROJECTS_FAILURE,
    error: { message: 'error' }
  };

  expect(ttlProjectsReducer(undefined, action)).toMatchObject(newState);
});
