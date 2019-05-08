import fellowPrePipFeedbackReducer from '../fellowPrePipFeedbackReducer';
import {
  GET_FELLOW_PRE_PIP_FEEDBACK_REQUEST,
  GET_FELLOW_PRE_PIP_FEEDBACK_SUCCESS,
  GET_FELLOW_PRE_PIP_FEEDBACK_FAILURE
} from '../../constants/fellowFeedback';

it('should return the initial state for unknown action type', () => {
  expect(fellowPrePipFeedbackReducer(undefined, {})).toEqual({
    error: null,
    feedback: [],
    loading: false
  });
});

it('should set loading state on fetching fellow pre pip feedback instances', () => {
  const newState = {
    error: null,
    feedback: [],
    loading: true
  };
  const action = { type: GET_FELLOW_PRE_PIP_FEEDBACK_REQUEST };
  expect(fellowPrePipFeedbackReducer(undefined, action)).toMatchObject(
    newState
  );
});

it('should add the fetched fellow pre pip feedback instance to state', () => {
  const newState = {
    loading: false,
    feedback: {}
  };
  const action = {
    type: GET_FELLOW_PRE_PIP_FEEDBACK_SUCCESS,
    feedback: {}
  };

  expect(fellowPrePipFeedbackReducer(undefined, action)).toMatchObject(
    newState
  );
});

it('should add the error message on failing to fetch the fellow pre pip feedback instances', () => {
  const newState = {
    loading: false,
    error: { message: 'error' },
    feedback: []
  };
  const action = {
    type: GET_FELLOW_PRE_PIP_FEEDBACK_FAILURE,
    error: { message: 'error' }
  };

  expect(fellowPrePipFeedbackReducer(undefined, action)).toMatchObject(
    newState
  );
});
