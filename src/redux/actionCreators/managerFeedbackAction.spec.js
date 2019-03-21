import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  LOAD_FEEDBACK_REQUEST,
  FEEDBACK_REQUEST_FAILURE,
  FEEDBACK_REQUEST_SUCCESS
} from '../constants/managerFeedbackActionTypes';
import getManagerFeedback from './managerFeedbackActions';

describe("fetch manager 's fellows feedback ", () => {
  const serverUrl = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverUrl}/api/v1/managers/feedback?email=trust.birungi@andela.com`;
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

  it(`dispatches LOAD_FEEDBACK_REQUEST and FEEDBACK_REQUEST
      on successful fetch of feedback for fellows under a manager`, () => {
    const data = [
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
    ];
    mock.onGet(`${baseURL}`).reply(200, data);
    const expectedActions = [
      { type: LOAD_FEEDBACK_REQUEST },
      {
        type: FEEDBACK_REQUEST_SUCCESS,
        managersFeedback: data
      }
    ];
    return store
      .dispatch(
        getManagerFeedback(
          { WATCH_TOWER_TTL: '43434343fdfr-' },
          'trust.birungi@andela.com'
        )
      )
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
  });

  it(`dispatches LOAD_FEEDBACK_REQUEST and FEEDBACK_REQUEST_FAILURE
  on failure to fetch developers feedback data`, () => {
    const expectedActions = [
      { type: LOAD_FEEDBACK_REQUEST },
      {
        type: FEEDBACK_REQUEST_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];
    return store
      .dispatch(getManagerFeedback('WATCH_TOWER_TTL', 'test@gfy.com'))
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
  });
});
