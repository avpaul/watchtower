import errorHandler from '../../services/errorHandler';
import * as types from '../constants/fellowProgressTypes';
import fellowsProgressService from '../../services/fellowsProgressService';
import { getFellows } from '../../services/engineeringManagerService';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

const loadFellowProgressSuccess = data => dispatch =>
  dispatch({
    type: types.LOAD_FELLOW_PROGRESS_SUCCESS,
    payload: data
  });

const loadFellowProgressFailure = error => dispatch =>
  dispatch({
    type: types.LOAD_FELLOW_PROGRESS_FAILURE,
    error: errorHandler(error)
  });

const getFellowProgress = ({
  ttl = 'all',
  location = 'all',
  role = 'ops'
} = {}) => dispatch => {
  dispatch({ type: types.LOAD_FELLOW_PROGRESS_REQUEST });
  const { fetchFellowsProgress } = fellowsProgressService;
  const requestURL = `${serverURL}/api/v1/fellows/cohorts?location=${location}`;
  const d0AURL = `${requestURL}&ttl=${ttl}&level=D0A`;
  const d0BURL = `${requestURL}&ttl=${ttl}&level=D0B`;
  const url = role === 'ops' ? [d0AURL, d0BURL] : requestURL;

  return fetchFellowsProgress(url)
    .then(data => dispatch(loadFellowProgressSuccess(data)))
    .catch(error => dispatch(loadFellowProgressFailure(error)));
};

export const getEmFellowsProgress = ({
  ttl = 'all',
  location = 'all'
}) => dispatch => {
  const url = `${serverURL}/api/v1/engineeringmanagers/fellows`;
  return getFellows({ url, ttl, location })
    .then(data => dispatch(loadFellowProgressSuccess(data)))
    .catch(error => dispatch(loadFellowProgressFailure(error)));
};

export default getFellowProgress;
