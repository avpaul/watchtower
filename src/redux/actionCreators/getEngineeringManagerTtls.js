import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/engineeringManagerTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

const getEngineeringManagerTtls = email => dispatch => {
  dispatch({ type: types.LOAD_ENGINEERING_MANAGER_TTLS_REQUEST });
  const newEmail =
    email.split('@')[0] === 'wt-test-em'
      ? process.env.REACT_APP_DEFAULT_WATCHTOWER_EM_EMAIL
      : email;
  const url = `${serverURL}/api/v1/engineeringmanagers/ttls/?email=${newEmail}`;
  return axios
    .get(url)
    .then(response =>
      dispatch({
        type: types.LOAD_ENGINEERING_MANAGER_TTLS_SUCCESS,
        data: response.data
      })
    )
    .catch(error =>
      dispatch({
        type: types.LOAD_ENGINEERING_MANAGER_TTLS_FAILURE,
        error: errorHandler(error)
      })
    );
};

export default getEngineeringManagerTtls;
