import initialState from './initialState';
import * as types from '../constants/ManagerFellowsSummaryTypes';

const managerFellowsSummary = (
  state = initialState.managerFellowsSummary,
  action
) => {
  switch (action.type) {
    case types.LOAD_MANAGER_FELLOWS_SUMMARY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.LOAD_MANAGER_FELLOWS_SUMMARY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.managerFellowsSummary
      };

    case types.LOAD_MANAGER_FELLOWS_SUMMARY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default managerFellowsSummary;
