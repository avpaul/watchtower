import initialState from './initialState';
import {
  FETCH_PROJECT_ROLES_REQUEST,
  FETCH_PROJECT_ROLES_SUCCESS,
  FETCH_PROJECT_ROLES_FAILURE,
  DELETE_PROJECT_ROLE,
  SET_PROJECT_ROLE_DELETE_TARGET,
  DELETE_PROJECT_ROLE_FAILURE
} from '../constants/cadreProjectRolesTypes';
import genericReducer from './genericReducer';

export const withDeleteProjectRole = reducer => (
  state = initialState.fetchAllRoles,
  action
) => {
  switch (action.type) {
    case DELETE_PROJECT_ROLE:
      return {
        ...state,
        data: state.data.filter(role => role.id !== action.data.role)
      };
    case DELETE_PROJECT_ROLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case SET_PROJECT_ROLE_DELETE_TARGET:
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
      FETCH_PROJECT_ROLES_REQUEST,
      FETCH_PROJECT_ROLES_SUCCESS,
      FETCH_PROJECT_ROLES_FAILURE,
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );

export default fetchRolesReducer;
