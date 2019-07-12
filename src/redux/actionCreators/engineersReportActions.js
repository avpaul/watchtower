import axios from 'axios';
import { serializeQuery } from './helpers';
import errorHandler from '../../services/errorHandler';
import * as types from '../constants/engineersReportTypes';
import initialState from '../reducers/initialState';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

const { meta } = initialState.reports;

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
const fetchEngineersReportActions = ({
  pageSize = meta.perPage,
  pageNumber = meta.page
}) => dispatch => {
  dispatch(fetchEngineersRequest());
  let url;

  if (pageSize === 'all') {
    url = `${serverURL}/api/v2/ops/reports/engineers`;
  } else {
    const queryParams = {
      page: pageNumber,
      limit: pageSize
    };
    url = `${serverURL}/api/v2/ops/reports/engineers?${serializeQuery(
      queryParams
    )}`;
  }

  return axios(url)
    .then(response =>
      dispatch(
        fetchEngineersSuccess({
          data: response.data
        })
      )
    )
    .catch(error => dispatch(fetchEngineersFailure(errorHandler(error))));
};

export default fetchEngineersReportActions;
