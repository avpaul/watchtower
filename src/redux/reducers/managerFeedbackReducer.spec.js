import managerFeedbackReducer from './managerFeedbackReducer';
import {
  LOAD_FEEDBACK_REQUEST,
  FEEDBACK_REQUEST_FAILURE,
  FEEDBACK_REQUEST_SUCCESS
} from '../constants/managerFeedbackActionTypes';
import initialState from './initialState';

it('should return the initial state for unknown action type', () => {
  expect(managerFeedbackReducer(undefined, {})).toEqual(initialState.feedback);
});

it('should trigger loading to true when fetching developers feedback data', () => {
  const newState = {
    loading: true,
    data: [],
    error: null
  };
  const action = { type: LOAD_FEEDBACK_REQUEST };
  expect(managerFeedbackReducer(initialState.feedback, action)).toEqual(
    newState
  );
});

it('should add the error message on failing to fetch developers feedback data', () => {
  const newState = {
    loading: false,
    data: [],
    error: { message: 'failed to fetch' }
  };
  const action = {
    type: FEEDBACK_REQUEST_FAILURE,
    error: { message: 'failed to fetch' }
  };
  expect(managerFeedbackReducer(initialState.feedback, action)).toEqual(
    newState
  );
});

it("should add fetched developers's data to state on success", () => {
  const newState = {
    loading: false,
    data: [
      {
        first_name: 'Oluseyi',
        last_name: 'Anani',
        level: 'D0B Apprenticeship',
        type: 'pre-pip',
        context: 'Your quality is below expectation, you are off-track',
        criteria: 'lms',
        manager: 'Trust birungi',
        manager_email: 'trust.birungi@andela.com',
        start_date: '2019-01-01',
        end_date: 'null',
        project: 'Watch Tower'
      }
    ],
    error: null
  };
  const action = {
    type: FEEDBACK_REQUEST_SUCCESS,
    feedback: [
      {
        first_name: 'Oluseyi',
        last_name: 'Anani',
        level: 'D0B Apprenticeship',
        type: 'pre-pip',
        context: 'Your quality is below expectation, you are off-track',
        criteria: 'lms',
        manager: 'Trust birungi',
        manager_email: 'trust.birungi@andela.com',
        start_date: '2019-01-01',
        end_date: 'null',
        project: 'Watch Tower'
      }
    ]
  };
  expect(managerFeedbackReducer(initialState.feedback, action)).toEqual(
    newState
  );
});
