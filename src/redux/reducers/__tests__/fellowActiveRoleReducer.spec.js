import fellowActiveRoleReducer from '../fellowActiveRoleReducer';
import {
  FETCH_ROLE_ACTIVE_ENGINEER_SUCCESS,
  FETCH_ROLE_ACTIVE_ENGINEER_REQUEST,
  FETCH_ROLE_ACTIVE_ENGINEER_FAILURE
} from '../../constants/fellowActiveRolesTypes';
import initialState from '../initialState';

describe('Fellow active role reducer', () => {
  it('should return the initial state for unknown action type', () => {
    expect(fellowActiveRoleReducer(undefined, {})).toEqual({
      loading: false,
      data: initialState.fetchActiveRole.data,
      error: null
    });
  });

  it('should set loading state on posting a new project', () => {
    const action = { type: FETCH_ROLE_ACTIVE_ENGINEER_REQUEST };
    expect(fellowActiveRoleReducer(undefined, action)).toEqual({
      ...initialState.fetchActiveRole,
      loading: true
    });
  });

  it('should execute the success action type case on successful post', () => {
    const action = {
      type: FETCH_ROLE_ACTIVE_ENGINEER_SUCCESS,
      data: []
    };

    const newState = {
      ...initialState.fetchActiveRole,
      data: action.data
    };

    expect(fellowActiveRoleReducer(undefined, action)).toEqual(newState);
  });

  it('should execute the failure action type case on failed post', () => {
    const action = {
      type: FETCH_ROLE_ACTIVE_ENGINEER_FAILURE,
      error: { message: 'error' }
    };

    const newState = {
      ...initialState.fetchActiveRole,
      error: action.error
    };

    expect(fellowActiveRoleReducer(undefined, action)).toEqual(newState);
  });
});
