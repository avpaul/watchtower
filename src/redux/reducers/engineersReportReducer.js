import * as types from '../constants/engineersReportTypes';
import initialState from './initialState';

/**
 * Reducer responsible for update state each time the
 * is a change in the component it is listening to
 * @param  {object} [state=initialState.d1Engineers]
 * @param  {object} action
 * @return {func}
 */
const fetchEngineerReportReducer = (state = initialState.reports, action) => {
  switch (action.type) {
    case types.FETCH_ENGINEER_REPORT_REQUEST:
      return { ...state, loading: true };
    case types.FETCH_ENGINEER_REPORT_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false
      };
    case types.FETCH_ENGINEER_REPORT_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
};

export default fetchEngineerReportReducer;
