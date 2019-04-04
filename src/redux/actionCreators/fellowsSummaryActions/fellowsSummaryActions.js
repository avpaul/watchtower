import Axios from 'axios';
import {
  FETCH_FELLOWS_SUMMARY_ERROR,
  FETCH_FELLOWS_SUMMARY_REQUEST,
  FETCH_FELLOWS_SUMMARY_SUCCESS
} from '../../constants/fellowActionTypes';
import fellowsSummaryService from '../../../services/fellowsSummaryService';
import errorHandler from '../../../services/errorHandler';
import { formatPerformanceData } from '../../../utils';

import {
  FETCH_TTLLF_SUMMARY_REQUEST,
  FETCH_TTLLF_SUMMARY_SUCCESS,
  FETCH_TTLLF_SUMMARY_ERROR,
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

export const fetchFellowsSummaryError = error => ({
  type: FETCH_FELLOWS_SUMMARY_ERROR,
  error
});

export const fetchFellowsSummarySuccess = payload => ({
  type: FETCH_FELLOWS_SUMMARY_SUCCESS,
  data: { ...payload }
});

export const fetchFellowsSummary = () => async dispatch => {
  dispatch({ type: FETCH_FELLOWS_SUMMARY_REQUEST });
  try {
    const response = await fellowsSummaryService.fetchFellowsSummary(
      `${
        process.env.REACT_APP_WATCHTOWER_SERVER
      }/api/v1/fellows/count?filter=summary`
    );
    dispatch(fetchFellowsSummarySuccess(response.data));
  } catch (error) {
    dispatch(fetchFellowsSummaryError(errorHandler(error)));
  }
};

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
export const fetchFellowsSummaryOps = () => dispatch => {
  dispatch({ type: FETCH_FELLOWS_SUMMARY_REQUEST });
  const requestURL = `${serverURL}/api/v2/fellows`;
  return Axios.all([
    Axios.get(`${requestURL}/history?type=current`),
    Axios.get(`${requestURL}/history?type=trend`)
  ]).then(
    Axios.spread(
      (fellowsSummaryToday, fellowsSummaryTrend) => {
        dispatch({
          type: FETCH_FELLOWS_SUMMARY_SUCCESS,
          fellowsSummaryToday: formatPerformanceData(fellowsSummaryToday.data),
          fellowsSummaryTrend: formatPerformanceData(fellowsSummaryTrend.data)
        });
      },
      error =>
        dispatch({
          type: FETCH_FELLOWS_SUMMARY_ERROR,
          error: errorHandler(error)
        })
    )
  );
};

export const fetchFellowsSummaryTTLLFAction = name => dispatch => {
  dispatch({ type: FETCH_TTLLF_SUMMARY_REQUEST });
  const requestURL = `${serverURL}/api/v1/ttls`;
  return Axios.all([
    Axios.get(`${requestURL}/trend?offset=5&name=${name}`),
    Axios.get(`${requestURL}/history?name=${name}`)
  ]).then(
    Axios.spread(
      (fellowsSummaryToday, fellowsSummaryTrend) => {
        dispatch({
          type: FETCH_TTLLF_SUMMARY_SUCCESS,
          fellowsSummaryToday: fellowsSummaryToday.data,
          fellowsSummaryTrend: fellowsSummaryTrend.data
        });
      },
      error =>
        dispatch({
          type: FETCH_TTLLF_SUMMARY_ERROR,
          error: errorHandler(error)
        })
    )
  );
};

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
