import initialState from './initialState';
import * as types from '../constants/cadreProjectRolesTypes';
import genericReducer from './genericReducer';

export const withDeleteProjectRole = reducer => (
  state = initialState.fetchAllRoles,
  action
) => {
  switch (action.type) {
    case types.DELETE_PROJECT_ROLE:
      return {
        ...state,
        data: state.data.filter(role => role.id !== action.data.role)
      };
    case types.DELETE_PROJECT_ROLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case types.SET_PROJECT_ROLE_DELETE_TARGET:
      return {
        ...state,
        deleteTarget: action.data
      };
    default:
      return reducer(state, action);
  }
};

const fetchRolesReducer = (state = initialState.allRoles, action) =>
  genericReducer(
    [
      types.FETCH_PROJECT_ROLES_REQUEST,
      types.FETCH_PROJECT_ROLES_SUCCESS,
      types.FETCH_PROJECT_ROLES_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );

export const fetchSingleRoleReducer = (
  state = initialState.singleRole,
  action
) =>
  genericReducer(
    [
      types.FETCH_SINGLE_ROLE_REQUEST,
      types.FETCH_SINGLE_ROLE_SUCCESS,
      types.FETCH_SINGLE_ROLE_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );

export default fetchRolesReducer;
