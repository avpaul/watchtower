import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/ManagerFellowsSummaryTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

export const resolveUrlByRole = (role, mockUrl) => {
  if (mockUrl) return mockUrl;
  let requestUrl;
  switch (true) {
    case !!role.WATCH_TOWER_TTL:
    case !!role.WATCH_TOWER_LF:
      requestUrl = `${serverURL}/api/v2/managers/fellows/summary`;
      break;
    case !!role.WATCH_TOWER_SL:
    case !!role.WATCH_TOWER_EM:
      requestUrl = `${serverURL}/api/v2/managers/details`;
      break;
    default:
  }
  return requestUrl;
};

const getManagerFellowsSummary = role => dispatch => {
  dispatch({
    type: types.LOAD_MANAGER_FELLOWS_SUMMARY_REQUEST
  });
  const requestUrl = resolveUrlByRole(role, process.env.REACT_APP_MOCK_API);

  return axios
    .get(requestUrl)
    .then(response =>
      dispatch({
        type: types.LOAD_MANAGER_FELLOWS_SUMMARY_SUCCESS,
        managerFellowsSummary: response.data
      })
    )
    .catch(error =>
      dispatch({
        type: types.LOAD_MANAGER_FELLOWS_SUMMARY_FAILURE,
        error: errorHandler(error)
      })
    );
};

export default getManagerFellowsSummary;
