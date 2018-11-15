import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as types from '../../../constants/fellowActionTypes';
import {
  fetchFellowsSummaryError,
  fetchFellowsSummarySuccess,
  fetchFellowsSummary
} from '../fellowsSummaryActions';

describe('fellowsSummaryActions', () => {
  const initialState = {
    OpsDashboard: {
      fellowsSummary: {
        loading: false,
        data: {
          allFellowsCount: 0,
          D0AFellowsCount: 0,
          D0BFellowsCount: 0
        },
        error: ''
      }
    }
  };
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v1/fellows/count?filter=summary`;
  const error = 'error fetching fellows summary';

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it('should create an action for fetch fellows summary error', () => {
    expect(fetchFellowsSummaryError(error)).toEqual({
      type: types.FETCH_FELLOWS_SUMMARY_ERROR,
      error
    });
  });

  it('should create an action for fetch fellows summary success', () => {
    const payload = { fakePayload: 'test data' };
    expect(fetchFellowsSummarySuccess(payload)).toEqual({
      type: types.FETCH_FELLOWS_SUMMARY_SUCCESS,
      payload
    });
  });

  it('creates FETCH_FELLOWS_SUMMARY_SUCCESS when fetching fellows summary is done', () => {
    const response = {
      data: {
        allFellowsCount: 0,
        D0AFellowsCount: 0,
        D0BFellowsCount: 0
      }
    };
    mock.onGet(baseURL).reply(200, { ...response });
    const expectedActions = [
      { type: types.FETCH_FELLOWS_SUMMARY_REQUEST },
      {
        type: types.FETCH_FELLOWS_SUMMARY_SUCCESS,
        payload: response.data
      }
    ];
    return store.dispatch(fetchFellowsSummary()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  });

  it('creates FETCH_FELLOWS_SUMMARY_ERROR when fetching fellows summary fails', () => {
    const response = {
      data: null,
      message: error,
      status: 'error'
    };
    mock.onGet(baseURL).reply(500, { ...response });
    const expectedActions = [
      { type: types.FETCH_FELLOWS_SUMMARY_REQUEST },
      {
        type: types.FETCH_FELLOWS_SUMMARY_ERROR,
        error
      }
    ];
    return store.dispatch(fetchFellowsSummary()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  });
});
