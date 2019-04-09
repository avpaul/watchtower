import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/managerActionTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

const formatPerformanceData = performanceData => ({
  ...performanceData,
  data: Object.values(performanceData.data).map(weekData => {
    const updatedWeekData = {};
    Object.keys(weekData).forEach(key => {
      if (key === 'week') updatedWeekData.week = weekData.week;
      else
        updatedWeekData[key] = {
          'On Track': weekData[key].ontrack,
          'Off Track': weekData[key].offtrack,
          PIP: weekData[key].pip,
          week: weekData[key].week
        };
    });
    return updatedWeekData;
  })
});

const getManagerProfileData = () => dispatch => {
  dispatch({ type: types.MANAGER_PROFILE_DATA_REQUEST });
  const requestURL = `${serverURL}/api/v2/managers/fellows/profile`;

  return axios.get(requestURL).then(
    response =>
      dispatch({
        type: types.MANAGER_PROFILE_DATA_SUCCESS,
        data: {
          ...response.data,
          performance: {
            today: formatPerformanceData(response.data.performance.today),
            trend: formatPerformanceData(response.data.performance.trend)
          }
        }
      }),
    error =>
      dispatch({
        type: types.MANAGER_PROFILE_DATA_FAILURE,
        error: errorHandler(error)
      })
  );
};

export default getManagerProfileData;
