import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { fetchFellowsSummaryTTLLFAction } from '../fellowsSummaryActions';
import {
  FETCH_TTLLF_SUMMARY_REQUEST,
  FETCH_TTLLF_SUMMARY_SUCCESS
} from '../../../constants/fellowSummary';

describe('fellowsSummaryActionsOps', () => {
  const initialState = {
    OpsDashboard: {
      fellowsSummary: {
        loading: false,
        data: {
          allFellowsCount: 0,
          D0AFellowsCount: 0,
          D0BFellowsCount: 0
        },
        fellowsSummaryToday: {},
        fellowsSummaryTrend: {},
        error: ''
      }
    }
  };
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v1/ttls`;

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it('creates FETCH_TTLLF_SUMMARY_SUCCESS when fetching fellows summary is done', () => {
    const response = {
      fellowsSummaryToday: {},
      fellowsSummaryTrend: {}
    };
    mock
      .onGet(`${baseURL}/trend?offset=5&name=Trust`)
      .reply(200, response.fellowsSummaryToday)
      .onGet(`${baseURL}/history?name=Trust`)
      .reply(200, response.fellowsSummaryTrend);

    const expectedActions = [
      { type: FETCH_TTLLF_SUMMARY_REQUEST },
      {
        type: FETCH_TTLLF_SUMMARY_SUCCESS,
        ...response
      }
    ];
    return store.dispatch(fetchFellowsSummaryTTLLFAction('Trust')).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  });
});
