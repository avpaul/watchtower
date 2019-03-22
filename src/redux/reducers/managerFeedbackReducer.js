import initialState from './initialState';
import * as types from '../constants/managerFeedbackActionTypes';
import genericReducer from './genericReducer';

const managerFeedbackReducer = (state = initialState.feedback, action) =>
  genericReducer(
    [
      types.LOAD_FEEDBACK_REQUEST,
      types.FEEDBACK_REQUEST_SUCCESS,
      types.FEEDBACK_REQUEST_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.feedback
    }
  );

export default managerFeedbackReducer;
