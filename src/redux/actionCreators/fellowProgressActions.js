import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/fellowProgressTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

const getFellowProgress = ({
  ttl = 'all',
  location = 'all'
} = {}) => dispatch => {
  dispatch({ type: types.LOAD_FELLOW_PROGRESS_REQUEST });
  const requestURL = `${serverURL}/api/v1/fellows/cohorts?filter=all&location=${location}&ttl=${ttl}`;
  return axios
    .all([
      axios.get(`${requestURL}&level=D0A`),
      axios.get(`${requestURL}&level=D0B`)
    ])
    .then(
      axios.spread(
        (fellowsProgressD0A, fellowsProgressD0B) => {
          dispatch({
            type: types.LOAD_FELLOW_PROGRESS_SUCCESS,
            fellowsProgressD0A: fellowsProgressD0A.data,
            fellowsProgressD0B: fellowsProgressD0B.data
          });
        },
        error =>
          dispatch({
            type: types.LOAD_FELLOW_PROGRESS_FAILURE,
            error: errorHandler(error)
          })
      )
    );
};

export default getFellowProgress;
