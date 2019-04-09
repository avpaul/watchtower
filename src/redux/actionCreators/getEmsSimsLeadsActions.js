import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/emsSimsLeadsTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

const getEmsSimsLeadsActions = () => dispatch => {
  dispatch({ type: types.LOAD_EM_SIMSLEADS_REQUEST });
  const url = `${serverURL}/api/v2/managers/details`;
  return axios
    .get(url)
    .then(response =>
      dispatch({
        type: types.LOAD_EM_SIMSLEADS_SUCCESS,
        data: response.data
      })
    )
    .catch(error =>
      dispatch({
        type: types.LOAD_EM_SIMSLEADS_FAILURE,
        error: errorHandler(error)
      })
    );
};

export default getEmsSimsLeadsActions;
