import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  GET_FELLOW_PIP_FEEDBACK_FAILURE,
  GET_FELLOW_PIP_FEEDBACK_REQUEST,
  GET_FELLOW_PIP_FEEDBACK_SUCCESS
} from '../../constants/fellowFeedback';
import { getFellowPipFeedback } from '../fellowPipFeedbackActions';

describe('fetch pip feedback for a fellow on pip', () => {
  const serverUrl = process.env.REACT_APP_WATCHTOWER_SERVER;
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore({
    loading: false,
    data: [],
    error: null
  });
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  const data = [
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
  ];

  it(`dispatches GET_PIP_FEEDBACK_REQUEST and GET_PIP_FEEDBACK_SUCCESS
      on successful fetch of pip feedback for fellows`, () => {
    const pipFeedbackUrl = `${serverUrl}/api/v2/fellows/feedback/pip`;
    mock.onGet(`${pipFeedbackUrl}`).reply(200, data);
    const expectedActions = [
      { type: GET_FELLOW_PIP_FEEDBACK_REQUEST },
      {
        feedback: data,
        type: GET_FELLOW_PIP_FEEDBACK_SUCCESS
      }
    ];
    return store.dispatch(getFellowPipFeedback()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });

  it(`dispatches GET_PIP_FEEDBACK_REQUEST and GET_PIP_FEEDBACK_FAILURE
      on successful fetch of pip feedback for fellows`, () => {
    const pipFeedbackUrl = `${serverUrl}/api/v2/fellows/feedback/pip`;
    mock.onGet(`${pipFeedbackUrl}`).reply(403, data);
    const expectedActions = [
      { type: GET_FELLOW_PIP_FEEDBACK_REQUEST },
      {
        type: GET_FELLOW_PIP_FEEDBACK_FAILURE,
        error: undefined
      }
    ];
    return store.dispatch(getFellowPipFeedback()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
});
