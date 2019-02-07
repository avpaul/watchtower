import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/simulationsLeadTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

const getSimulationsLeadLfs = email => dispatch => {
  dispatch({ type: types.LOAD_SIMULATIONS_LEAD_LF_REQUEST });
  const newEmail =
    email.split('@')[0] === 'wt-test-sl'
      ? process.env.REACT_APP_DEFAULT_WATCHTOWER_SIMULATIONS_LEAD_EMAIL
      : email;
  const url = `${serverURL}/api/v1/simulationsLeads/lfs?email=${newEmail}`;
  return axios
    .get(url)
    .then(response =>
      dispatch({
        type: types.LOAD_SIMULATIONS_LEAD_LF_SUCCESS,
        data: response.data
      })
    )
    .catch(error =>
      dispatch({
        type: types.LOAD_SIMULATIONS_LEAD_LF_FAILURE,
        error: errorHandler(error)
      })
    );
};

export default getSimulationsLeadLfs;
