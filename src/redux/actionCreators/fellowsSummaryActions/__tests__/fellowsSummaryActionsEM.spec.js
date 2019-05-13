import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as types from '../../../constants/fellowSummary';
import { fetchFellowsSummaryEm } from '../fellowsSummaryActions';

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
  const response = {
    performance: {
      today: {
        keys: [
          '-KXGy1MT1oimjQgFim8t',
          '-LDetFxSyHMIJqlvwcQH',
          '-KmRUHvf0LMutnbAhjp5'
        ],
        data: {
          '2019-01-14': {
            '-KXGy1MT1oimjQgFim8t': {
              offtrack: 4,
              ontrack: 120,
              pip: 0,
              week: '2019-01-14'
            },
            '-LDetFxSyHMIJqlvwcQH': {
              ontrack: 13,
              offtrack: 0,
              pip: 0,
              week: '2019-01-14'
            },
            '-KmRUHvf0LMutnbAhjp5': {
              ontrack: 13,
              offtrack: 2,
              pip: 0,
              week: '2019-01-14'
            },
            Total: {
              ontrack: 120,
              offtrack: 4,
              pip: 0,
              week: '2019-01-14'
            }
          }
        }
      }
    }
  };

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it('creates FETCH_FELLOWS_SUMMARY_SUCCESS when fetching ems fellows summary is done', () => {
    mock
      .onGet(`${serverURL}/api/v2/managers/fellows/performance`)
      .reply(200, response);

    const expectedActions = [
      { type: types.FETCH_EM_SUMMARY_REQUEST },
      {
        type: types.FETCH_EM_SUMMARY_SUCCESS
      }
    ];
    return store.dispatch(fetchFellowsSummaryEm()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  });

  it('creates FETCH_FELLOWS_SUMMARY_ERROR when fetching ems  fellows summary is done', () => {
    mock
      .onGet(`${serverURL}/api/v2/managers/fellows/performance`)
      .reply(500, {});

    const expectedActions = [
      { type: types.FETCH_EM_SUMMARY_REQUEST },
      {
        type: types.FETCH_EM_SUMMARY_ERROR
      }
    ];
    return store.dispatch(fetchFellowsSummaryEm()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  });
});
