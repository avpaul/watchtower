import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/managerActionTypes';
import { formatPerformanceData } from '../../utils';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

const getManagerProfileData = () => dispatch => {
  dispatch({ type: types.MANAGER_PROFILE_DATA_REQUEST });
  const requestURL = `${serverURL}/api/v2/managers/fellows/profile`;

  return axios.get(requestURL).then(
    response => {
      const { data } = response;

      if (data.performance) {
        data.performance = {
          today: formatPerformanceData(response.data.performance.today),
          trend: formatPerformanceData(response.data.performance.trend)
        };
      }

      return dispatch({
        type: types.MANAGER_PROFILE_DATA_SUCCESS,
        data
      });
    },
    error =>
      dispatch({
        type: types.MANAGER_PROFILE_DATA_FAILURE,
        error: errorHandler(error)
      })
  );
};

export default getManagerProfileData;
