import axios from 'axios';

import errorHandler from '../../services/errorHandler';
import * as types from '../constants/fellowFeedback';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

export const getPrePipFeedbackRequest = () => ({
  type: types.GET_FELLOW_PRE_PIP_FEEDBACK_REQUEST
});

export const getPrePipFeedbackSuccess = feedback => ({
  type: types.GET_FELLOW_PRE_PIP_FEEDBACK_SUCCESS,
  feedback
});

export const getPrePipFeedbackFailure = error => ({
  type: types.GET_FELLOW_PRE_PIP_FEEDBACK_FAILURE,
  error
});

const getFellowPrePipFeedback = () => dispatch => {
  dispatch(getPrePipFeedbackRequest());

  const requestURL = `${serverURL}/api/v2/fellows/feedback`;

  return axios.get(requestURL).then(
    response => {
      dispatch(getPrePipFeedbackSuccess(response.data));
    },
    error => {
      dispatch(getPrePipFeedbackFailure(errorHandler(error)));
    }
  );
};

export default getFellowPrePipFeedback;
