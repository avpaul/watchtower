import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import {
  LOAD_D1_FELLOW_PROFILE_DATA_REQUEST,
  LOAD_D1_FELLOW_PROFILE_DATA_SUCCESS,
  LOAD_D1_FELLOW_PROFILE_DATA_FAILURE
} from '../constants/d1FellowProfileDataTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

export default () => dispatch => {
  dispatch({ type: LOAD_D1_FELLOW_PROFILE_DATA_REQUEST });

  return axios.get(`${serverURL}/api/v2/fellows/profile/cadre`).then(
    response =>
      dispatch({
        type: LOAD_D1_FELLOW_PROFILE_DATA_SUCCESS,
        fellow: response.data.fellow
      }),
    error =>
      dispatch({
        type: LOAD_D1_FELLOW_PROFILE_DATA_FAILURE,
        error: errorHandler(error)
      })
  );
};
