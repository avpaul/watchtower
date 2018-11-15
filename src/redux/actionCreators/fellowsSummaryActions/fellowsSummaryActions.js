import {
  FETCH_FELLOWS_SUMMARY_ERROR,
  FETCH_FELLOWS_SUMMARY_REQUEST,
  FETCH_FELLOWS_SUMMARY_SUCCESS
} from '../../constants/fellowActionTypes';
import fellowsSummaryService from '../../../services/fellowsSummaryService';
import errorHandler from '../../../services/errorHandler';

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
