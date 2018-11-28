import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import {
  LOAD_FELLOWBIO_REQUEST,
  LOAD_FELLOWBIO_SUCCESS,
  LOAD_FELLOWBIO_FAILURE
} from '../constants/fellowBioTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
const getFellowBio = email => dispatch => {
  dispatch({ type: LOAD_FELLOWBIO_REQUEST });

  const url = `${serverURL}/api/v1/fellows/profile?email=${email}`;
  return axios.get(url).then(
    response =>
      dispatch({
        type: LOAD_FELLOWBIO_SUCCESS,
        fellow: response.data.data
      }),
    error =>
      dispatch({
        type: LOAD_FELLOWBIO_FAILURE,
        error: errorHandler(error)
      })
  );
};

export default getFellowBio;
