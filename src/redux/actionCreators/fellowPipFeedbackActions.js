import axios from 'axios';
import * as types from '../constants/fellowFeedback';
import errorHandler from '../../services/errorHandler';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

export const getPipFeedbackRequest = () => ({
  type: types.GET_FELLOW_PIP_FEEDBACK_REQUEST
});

export const getPipFeedbackSuccess = feedback => ({
  type: types.GET_FELLOW_PIP_FEEDBACK_SUCCESS,
  feedback
});

export const getPipFeedbackFailure = error => ({
  type: types.GET_FELLOW_PIP_FEEDBACK_FAILURE,
  error
});

export const getFellowPipFeedback = () => dispatch => {
  dispatch(getPipFeedbackRequest());
  const requestURL = `${serverURL}/api/v2/fellows/feedback/pip`;
  return axios.get(requestURL).then(
    response => {
      dispatch(getPipFeedbackSuccess(response.data));
    },
    error => {
      dispatch(getPipFeedbackFailure(errorHandler(error)));
    }
  );
};
