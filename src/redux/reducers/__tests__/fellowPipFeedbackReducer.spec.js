import fellowPipFeedbackReducer from '../fellowPipFeedbackReducer';
import {
  GET_FELLOW_PIP_FEEDBACK_FAILURE,
  GET_FELLOW_PIP_FEEDBACK_REQUEST,
  GET_FELLOW_PIP_FEEDBACK_SUCCESS
} from '../../constants/fellowFeedback';
import initialState from '../initialState';

it('should return the initial state for unknown action type', () => {
  expect(fellowPipFeedbackReducer(undefined, {})).toEqual(
    initialState.fellowPipFeedback
  );
});

it('should trigger loading to true when fetching fellows feedback data', () => {
  const newState = {
    loading: true,
    feedback: [],
    error: null
  };
  const action = { type: GET_FELLOW_PIP_FEEDBACK_REQUEST };
  expect(
    fellowPipFeedbackReducer(initialState.fellowPipFeedback, action)
  ).toEqual(newState);
});

it('should add the error message on failing to fetch developers pip feedback data', () => {
  const newState = {
    feedback: [],
    error: {
      message: 'failed to fetch'
    },
    loading: false
  };
  const action = {
    type: GET_FELLOW_PIP_FEEDBACK_FAILURE,
    error: { message: 'failed to fetch' }
  };
  expect(
    fellowPipFeedbackReducer(initialState.fellowPipFeedback, action)
  ).toEqual(newState);
});

it("should return fetched developers's pip feedback data to state on success", () => {
  const newState = {
    feedback: [
      {
        id: 1,
        details_type: 'rating',
        details_id: 1,
        fellow_id: '-LHs4sEcIAVnPeKHTBGd',
        started_at: '2019-04-25 00:00:00',
        expected_to_end_at: '2019-05-09 00:00:00',
        support: '[]',
        week_number: 14,
        staff_id: '-LGy4OuPDHCZCZvDuPz0',
        status: 'ongoing',
        created_at: '2019-04-25 12:00:21',
        updated_at: '2019-04-25 12:00:21',
        pip_for_dev_pulse: {
          id: 1,
          attributes: [
            {
              attribute: 'quality',
              score: 0,
              description:
                'Improve your code quality to match the team and global standards',
              activity: 'Quality',
              details: 'Remove commented code'
            },
            {
              attribute: 'integration',
              score: 0,
              description: 'Improve your relationship to other teammates',
              activity: 'Quality',
              details: 'Be more active in team activities'
            }
          ],
          created_at: '2019-04-25 12:00:21',
          updated_at: '2019-04-25 12:00:21'
        },
        pip_for_lms: null
      }
    ],
    loading: false,
    error: null
  };
  const action = {
    type: GET_FELLOW_PIP_FEEDBACK_SUCCESS,
    feedback: [
      {
        id: 1,
        details_type: 'rating',
        details_id: 1,
        fellow_id: '-LHs4sEcIAVnPeKHTBGd',
        started_at: '2019-04-25 00:00:00',
        expected_to_end_at: '2019-05-09 00:00:00',
        support: '[]',
        week_number: 14,
        staff_id: '-LGy4OuPDHCZCZvDuPz0',
        status: 'ongoing',
        created_at: '2019-04-25 12:00:21',
        updated_at: '2019-04-25 12:00:21',
        pip_for_dev_pulse: {
          id: 1,
          attributes: [
            {
              attribute: 'quality',
              score: 0,
              description:
                'Improve your code quality to match the team and global standards',
              activity: 'Quality',
              details: 'Remove commented code'
            },
            {
              attribute: 'integration',
              score: 0,
              description: 'Improve your relationship to other teammates',
              activity: 'Quality',
              details: 'Be more active in team activities'
            }
          ],
          created_at: '2019-04-25 12:00:21',
          updated_at: '2019-04-25 12:00:21'
        },
        pip_for_lms: null
      }
    ]
  };
  expect(
    fellowPipFeedbackReducer(initialState.fellowPipFeedback, action)
  ).toEqual(newState);
});
