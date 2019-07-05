import createProjectReducer from '../createProjectReducer';
import {
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE
} from '../../constants/projectsTypes';
import initialState from '../initialState';

describe('Create project reducer', () => {
  it('should return the initial state for unknown action type', () => {
    expect(createProjectReducer(undefined, {})).toEqual(
      initialState.createProject
    );
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
      data: { message: 'Success!' }
    };

    expect(createProjectReducer(undefined, action)).toMatchObject({
      ...initialState.createProject,
      data: action.data
    });
  });

  it('should execute the failure action type case on failed post', () => {
    const action = {
      type: CREATE_PROJECT_FAILURE,
      error: { message: 'error' }
    };

    expect(createProjectReducer(undefined, action)).toMatchObject({
      ...initialState.createProject,
      error: action.error
    });
  });
});
