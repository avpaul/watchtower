import initialState from './initialState';
import * as types from '../constants/managerFeedbackActionTypes';

const managerFeedbackReducer = (state = initialState.feedback, action) => {
  switch (action.type) {
    case types.LOAD_FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.FEEDBACK_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.feedback
      };

    case types.FEEDBACK_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default managerFeedbackReducer;
