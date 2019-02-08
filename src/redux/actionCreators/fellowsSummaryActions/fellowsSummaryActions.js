import Axios from 'axios';
import {
  FETCH_FELLOWS_SUMMARY_ERROR,
  FETCH_FELLOWS_SUMMARY_REQUEST,
  FETCH_FELLOWS_SUMMARY_SUCCESS
} from '../../constants/fellowActionTypes';
import fellowsSummaryService from '../../../services/fellowsSummaryService';
import errorHandler from '../../../services/errorHandler';
import {
  FETCH_TTLLF_SUMMARY_REQUEST,
  FETCH_TTLLF_SUMMARY_SUCCESS,
  FETCH_TTLLF_SUMMARY_ERROR,
  FETCH_EM_SUMMARY_REQUEST,
  FETCH_EM_SUMMARY_SUCCESS,
  FETCH_EM_SUMMARY_ERROR
} from '../../constants/fellowSummary';

export const fetchFellowsSummaryError = error => ({
  type: FETCH_FELLOWS_SUMMARY_ERROR,
  error
});

export const fetchFellowsSummarySuccess = payload => ({
  type: FETCH_FELLOWS_SUMMARY_SUCCESS,
  payload
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
  const requestURL = `${serverURL}/api/v1/fellows`;
  return Axios.all([
    Axios.get(`${requestURL}/trend?offset=5`),
    Axios.get(`${requestURL}/history`)
  ]).then(
    Axios.spread(
      (fellowsSummaryToday, fellowsSummaryTrend) => {
        dispatch({
          type: FETCH_FELLOWS_SUMMARY_SUCCESS,
          fellowsSummaryToday: fellowsSummaryToday.data,
          fellowsSummaryTrend: fellowsSummaryTrend.data
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
