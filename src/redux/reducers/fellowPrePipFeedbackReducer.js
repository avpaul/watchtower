import * as types from '../constants/fellowFeedback';
import initialState from './initialState';

const fellowPrePipFeedbackReducer = (
  state = initialState.fellowPrePipFeedback,
  action
) => {
  switch (action.type) {
    case types.GET_FELLOW_PRE_PIP_FEEDBACK_REQUEST: {
      return {
        ...state,
        feedback: [],
        loading: true,
        error: null
      };
    }
    case types.GET_FELLOW_PRE_PIP_FEEDBACK_SUCCESS: {
      return {
        ...state,
        feedback: action.feedback,
        loading: false,
        error: null
      };
    }
    case types.GET_FELLOW_PRE_PIP_FEEDBACK_FAILURE: {
      return {
        ...state,
        feedback: [],
        loading: false,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
};

export default fellowPrePipFeedbackReducer;
