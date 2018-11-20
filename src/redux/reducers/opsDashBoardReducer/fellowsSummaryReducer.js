import {
  FETCH_FELLOWS_SUMMARY_ERROR,
  FETCH_FELLOWS_SUMMARY_REQUEST,
  FETCH_FELLOWS_SUMMARY_SUCCESS
} from '../../constants/fellowActionTypes';
import initialState from '../initialState';

const fellowsSummaryReducer = (
  state = initialState.opsDashboard.fellowsSummary,
  action
) => {
  switch (action.type) {
    case FETCH_FELLOWS_SUMMARY_REQUEST:
      return { ...state, loading: true };
    case FETCH_FELLOWS_SUMMARY_ERROR:
      return { ...state, error: action.error };
    case FETCH_FELLOWS_SUMMARY_SUCCESS:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

/**
 * Return array of fellow summary
 * @exports
 *
 * @param {object} state Redux state tree
 *
 * @returns {Array} Array of fellow summary
 */
export const getFellowsSummary = state => {
  const fellowsSummaryData = state.fellowsSummary.data;
  const keys = Object.keys(fellowsSummaryData);
  return keys.map(key => {
    if (key === 'allFellowsCount') {
      return {
        id: key,
        title: 'Total D0 Fellows',
        totalFellows: fellowsSummaryData[key]
      };
    }

    return {
      id: key,
      title: `Total ${key.slice(0, 3)} Fellows`,
      totalFellows: fellowsSummaryData[key]
    };
  });
};

export default fellowsSummaryReducer;
