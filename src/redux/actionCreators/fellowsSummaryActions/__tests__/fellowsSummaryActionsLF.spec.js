import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as types from '../../../constants/fellowSummary';
import { fetchFellowsSummaryLf } from '../fellowsSummaryActions';

describe('fellowsSummaryActions', () => {
  const initialState = {
    emsDashboard: {
      fellowsSummary: {
        loading: false,
        summary: [],
        error: ''
      }
    }
  };
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/managers`;

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it('creates FETCH_FELLOWS_SUMMARY_SUCCESS when fetching ems fellows summary is done', () => {
    const response = {
      summary: {}
    };
    mock
      .onGet(`${baseURL}/history?email=daniel.ale@andela.com`)
      .reply(200, response);

    const expectedActions = [
      { type: types.FETCH_LF_SUMMARY_REQUEST },
      {
        type: types.FETCH_LF_SUMMARY_SUCCESS
      }
    ];
    return store
      .dispatch(fetchFellowsSummaryLf('daniel.ale@andela.com'))
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toMatchObject(expectedActions);
      });
  });

  it('creates FETCH_FELLOWS_SUMMARY_ERROR when fetching ems  fellows summary is done', () => {
    const response = {
      summary: {}
    };
    mock
      .onGet(`${baseURL}/history?email=daniel.ale@andela.com`)
      .reply(500, response);

    const expectedActions = [
      { type: types.FETCH_LF_SUMMARY_REQUEST },
      {
        type: types.FETCH_LF_SUMMARY_ERROR
      }
    ];
    return store
      .dispatch(fetchFellowsSummaryLf('daniel.ale@andela.com'))
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toMatchObject(expectedActions);
      });
  });
});
