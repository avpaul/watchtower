import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import { formatPerformanceData } from '../../utils';

import {
  FETCH_PERFORMANCE_DATA_FAILURE,
  FETCH_PERFORMANCE_DATA_SUCCESS,
  FETCH_PERFORMANCE_DATA_REQUEST
} from '../constants/performanceTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

/**
 * Fetches the performance trend data
 * @param chartType the performance data chart type. ('history', 'trend')
 */
export default (chartType = '') => dispatch => {
  dispatch({ type: FETCH_PERFORMANCE_DATA_REQUEST });

  return axios
    .get(
      `${serverURL}/api/v2/managers/fellows/performance${
        chartType ? `?type=${chartType}` : ''
      }`
    )
    .then(
      response => {
        const {
          performance: { today, trend }
        } = response.data;
        const data = {};

        if (today) data.today = formatPerformanceData(today);
        if (trend) data.trend = formatPerformanceData(trend);

        dispatch({
          type: FETCH_PERFORMANCE_DATA_SUCCESS,
          data
        });
      },
      error =>
        dispatch({
          type: FETCH_PERFORMANCE_DATA_FAILURE,
          error: errorHandler(error)
        })
    );
};
