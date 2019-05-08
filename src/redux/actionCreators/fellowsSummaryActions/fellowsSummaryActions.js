import Axios from 'axios';
import errorHandler from '../../../services/errorHandler';

import {
  FETCH_EM_SUMMARY_REQUEST,
  FETCH_EM_SUMMARY_SUCCESS,
  FETCH_EM_SUMMARY_ERROR,
  FETCH_SL_SUMMARY_REQUEST,
  FETCH_SL_SUMMARY_SUCCESS,
  FETCH_SL_SUMMARY_ERROR,
  FETCH_LF_SUMMARY_REQUEST,
  FETCH_LF_SUMMARY_SUCCESS,
  FETCH_LF_SUMMARY_ERROR,
  FETCH_TTL_SUMMARY_REQUEST,
  FETCH_TTL_SUMMARY_SUCCESS,
  FETCH_TTL_SUMMARY_ERROR
} from '../../constants/fellowSummary';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

export const fetchFellowsSummaryEm = email => dispatch => {
  dispatch({ type: FETCH_EM_SUMMARY_REQUEST });
  const requestURL = `${serverURL}/api/v1/engineeringmanager`;
  const newEmail =
    email.split('@')[0] === 'wt-test-em'
      ? process.env.REACT_APP_DEFAULT_WATCHTOWER_EM_EMAIL
      : email;
  return Axios.get(`${requestURL}/history?email=${newEmail}`).then(
    response => {
      dispatch({
        type: FETCH_EM_SUMMARY_SUCCESS,
        summary: response.data.data
      });
    },
    error => {
      dispatch({
        type: FETCH_EM_SUMMARY_ERROR,
        error: errorHandler(error)
      });
    }
  );
};

export const fetchFellowsSummarySl = email => dispatch => {
  dispatch({ type: FETCH_SL_SUMMARY_REQUEST });
  const requestURL = `${serverURL}/api/v1/simulationsleads`;
  const newEmail =
    email.split('@')[0] === 'wt-test-sl'
      ? process.env.REACT_APP_DEFAULT_WATCHTOWER_SIMULATIONS_LEAD_EMAIL
      : email;
  return Axios.get(`${requestURL}/history?email=${newEmail}`).then(
    response => {
      dispatch({
        type: FETCH_SL_SUMMARY_SUCCESS,
        summary: response.data.data
      });
    },
    error => {
      dispatch({
        type: FETCH_SL_SUMMARY_ERROR,
        error: errorHandler(error)
      });
    }
  );
};

export const fetchFellowsSummaryLf = email => dispatch => {
  dispatch({ type: FETCH_LF_SUMMARY_REQUEST });
  const requestURL = `${serverURL}/api/v2/managers`;
  return Axios.get(`${requestURL}/history?email=${email}`).then(
    response => {
      dispatch({
        type: FETCH_LF_SUMMARY_SUCCESS,
        summary: response.data.data
      });
    },
    error => {
      dispatch({
        type: FETCH_LF_SUMMARY_ERROR,
        error: errorHandler(error)
      });
    }
  );
};

export const fetchFellowsSummaryTtl = name => dispatch => {
  dispatch({ type: FETCH_TTL_SUMMARY_REQUEST });
  const requestURL = `${serverURL}/api/v1/ttls`;
  return Axios.get(`${requestURL}/history?name=${name}`).then(
    response => {
      dispatch({
        type: FETCH_TTL_SUMMARY_SUCCESS,
        summary: response.data.data
      });
    },
    error => {
      dispatch({
        type: FETCH_TTL_SUMMARY_ERROR,
        error: errorHandler(error)
      });
    }
  );
};
