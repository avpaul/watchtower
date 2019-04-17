import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/ManagerFellowsSummaryTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
const ttlEmail = process.env.REACT_APP_DEFAULT_WATCHTOWER_TTL_EMAIL;
const emEmail = process.env.REACT_APP_DEFAULT_WATCHTOWER_EM_EMAIL;
const simsLeadEmail =
  process.env.REACT_APP_DEFAULT_WATCHTOWER_SIMULATIONS_LEAD_EMAIL;

const getUrl = (email, testEmail, envMail, roleId) => {
  let url;
  switch (roleId) {
    case 1:
      url = '/api/v2/managers/details';
      break;
    case 2:
      url = '/api/v1/simulationsLeads/lfs?email=';
      break;
    default:
      url = '/api/v1/manager/fellows/summary?email=';
  }
  if (url.includes('email'))
    return `${serverURL}${url}${email === testEmail ? envMail : email}`;
  return `${serverURL}${url}`;
};

export const resolveUrlByRole = (
  role,
  email,
  ttlEnvEmail,
  simsLeadEnvEmail,
  emEnvEmail,
  mockUrl
) => {
  if (mockUrl) return mockUrl;
  let requestUrl;
  switch (true) {
    case !!role.WATCH_TOWER_TTL:
      requestUrl = getUrl(email, 'wt-test-ttl@andela.com', ttlEnvEmail);
      break;
    case !!role.WATCH_TOWER_LF:
      requestUrl = getUrl(email, 'wt-test-lf@andela.com', ttlEnvEmail);
      break;
    case !!role.WATCH_TOWER_SL:
      requestUrl = getUrl(email, 'wt-test-sl@andela.com', simsLeadEnvEmail, 2);
      break;
    case !!role.WATCH_TOWER_EM:
      requestUrl = getUrl(email, 'wt-test-em@andela.com', emEnvEmail, 1);
      break;
    default:
  }
  return requestUrl;
};

const getManagerFellowsSummary = (role, email) => dispatch => {
  dispatch({
    type: types.LOAD_MANAGER_FELLOWS_SUMMARY_REQUEST
  });
  const requestUrl = resolveUrlByRole(
    role,
    email,
    ttlEmail,
    simsLeadEmail,
    emEmail,
    process.env.REACT_APP_MOCK_API
  );

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
