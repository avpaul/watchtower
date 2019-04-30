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
  manager = 'all',
  location = 'all',
  cohort = 'all'
} = {}) => dispatch => {
  dispatch({ type: types.LOAD_FELLOW_PROGRESS_REQUEST });
  const { fetchFellowsProgress } = fellowsProgressService;
  const requestURL = `${serverURL}/api/v2/fellows/filter`;
  let params = '';

  params +=
    manager && manager.toLowerCase() !== 'all' ? `manager=${manager}&` : '';
  params +=
    location && location.toLowerCase() !== 'all' ? `location=${location}&` : '';
  params += cohort && cohort.toLowerCase() !== 'all' ? `cohort=${cohort}&` : '';

  params = params ? `?${params.substr(0, params.length - 1)}` : '';

  return fetchFellowsProgress(`${requestURL}${params}`)
    .then(data => {
      dispatch(loadFellowProgressSuccess(data || { D0A: [], D0B: [] }));
    })
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
