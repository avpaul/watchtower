import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  GET_FELLOW_PRE_PIP_FEEDBACK_REQUEST,
  GET_FELLOW_PRE_PIP_FEEDBACK_FAILURE,
  GET_FELLOW_PRE_PIP_FEEDBACK_SUCCESS
} from '../../constants/fellowFeedback';
import fellowPrePipFeedbackActions from '../fellowPrePipFeedbackActions';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

describe('Fellow Pre Pip Feedback Actions', () => {
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const url = `${serverURL}/api/v2/fellows/feedback`;
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

  it('dispatches GET_FELLOW_PRE_PIP_FEEDBACK_REQUEST and  GET_FELLOW_PRE_PIP_FEEDBACK_FAILURE on failing to fetch a fellow pre pip feedback instances', () => {
    const expectedActions = [
      { type: GET_FELLOW_PRE_PIP_FEEDBACK_REQUEST },
      {
        type: GET_FELLOW_PRE_PIP_FEEDBACK_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];
    return store.dispatch(fellowPrePipFeedbackActions()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
  it('dispatches GET_FELLOW_PRE_PIP_FEEDBACK_REQUEST and  GET_FELLOW_PRE_PIP_FEEDBACK_SUCCESS on successfully fetching pre pip feedback instances for a fellow', () => {
    const data = {};

    mock.onGet(`${url}`).reply(200, data);

    const expectedActions = [
      { type: GET_FELLOW_PRE_PIP_FEEDBACK_REQUEST },
      {
        type: GET_FELLOW_PRE_PIP_FEEDBACK_SUCCESS,
        feedback: {}
      }
    ];
    return store.dispatch(fellowPrePipFeedbackActions()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
});
