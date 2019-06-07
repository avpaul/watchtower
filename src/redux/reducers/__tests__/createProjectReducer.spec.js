import createProjectReducer from '../createProjectReducer';
import {
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE
} from '../../constants/projectsTypes';
import initialState from '../initialState';

it('should return the initial state for unknown action type', () => {
  expect(createProjectReducer(undefined, {})).toEqual({
    loading: false,
    data: initialState.createProject.data,
    error: null
  });
});

it('should set loading state on posting a new project', () => {
  const action = { type: CREATE_PROJECT_REQUEST };
  expect(createProjectReducer(undefined, action)).toMatchObject({
    ...initialState.createProject,
    loading: true
  });
});

it('should execute the success action type case on successful post', () => {
  const action = {
    type: CREATE_PROJECT_SUCCESS,
    data: {}
  };

  const newState = {
    ...initialState.createProject,
    data: action.data
  };

  expect(createProjectReducer(undefined, action)).toMatchObject(newState);
});

it('should execute the failure action type case on failed post', () => {
  const action = {
    type: CREATE_PROJECT_FAILURE,
    error: { message: 'error' }
  };

  const newState = {
    ...initialState.createProject,
    error: action.error
  };

  expect(createProjectReducer(undefined, action)).toMatchObject(newState);
});
