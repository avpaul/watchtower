import Axios from 'axios';
import errorHandler from '../../../services/errorHandler';
import { formatPerformanceData } from '../../../utils';

import {
  FETCH_EM_SUMMARY_REQUEST,
  FETCH_EM_SUMMARY_SUCCESS,
  FETCH_EM_SUMMARY_ERROR
} from '../../constants/fellowSummary';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

export const fetchFellowsSummaryEm = () => dispatch => {
  dispatch({ type: FETCH_EM_SUMMARY_REQUEST });
  return Axios.get(`${serverURL}/api/v2/managers/fellows/performance`).then(
    response => {
      const { data } = formatPerformanceData(response.data.performance.today);
      dispatch({
        type: FETCH_EM_SUMMARY_SUCCESS,
        summary: data
      });
    },
    error => {
      dispatch({
        type: FETCH_EM_SUMMARY_ERROR,
        error: errorHandler(error)
      });
    }
  );
};

export default fetchFellowsSummaryEm;
