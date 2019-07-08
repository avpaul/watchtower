import axios from 'axios';
import { serializeQuery } from './helpers';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/engineersReportTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

export const fetchEngineersRequest = () => ({
  type: types.FETCH_ENGINEER_REPORT_REQUEST
});

export const fetchEngineersSuccess = data => ({
  type: types.FETCH_ENGINEER_REPORT_SUCCESS,
  data
});

export const fetchEngineersFailure = error => ({
  type: types.FETCH_ENGINEER_REPORT_FAILURE,
  error
});

/**
 * Action creator to fetch all engineers
 * @return {void}
 */
const fetchEngineersReportActions = () => (dispatch, getState) => {
  dispatch(fetchEngineersRequest());
  const { meta } = getState().reports;
  const queryParams = {
    page: meta.page,
    limit: meta.perPage
  };
  const url = `${serverURL}/api/v2/ops/reports/engineers?${serializeQuery(
    queryParams
  )}`;

  return axios(url)
    .then(response =>
      dispatch(
        fetchEngineersSuccess({
          data: response.data,
          meta: {
            page: 1,
            perPage: 10
          }
        })
      )
    )
    .catch(error => dispatch(fetchEngineersFailure(errorHandler(error))));
};

export default fetchEngineersReportActions;
