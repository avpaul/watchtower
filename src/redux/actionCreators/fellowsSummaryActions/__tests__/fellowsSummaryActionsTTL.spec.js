import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as types from '../../../constants/fellowActionTypes';
import {
  fetchFellowsSummaryError,
  fetchFellowsSummarySuccess,
  fetchFellowsSummaryOps
} from '../fellowsSummaryActions';
import { formatPerformanceData } from '../../../../utils';
import PerformanceData from '../../../../__mocks__/performanceByProjectData.json';

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
  const baseURL = `${serverURL}/api/v2/fellows`;
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
      data: { ...payload }
    });
  });

  it('creates FETCH_FELLOWS_SUMMARY_SUCCESS when fetching fellows summary is done', () => {
    const response = {
      fellowsSummaryToday: formatPerformanceData(PerformanceData),
      fellowsSummaryTrend: formatPerformanceData(PerformanceData)
    };

    mock
      .onGet(`${baseURL}/history?type=current`)
      .reply(200, PerformanceData)
      .onGet(`${baseURL}/history?type=trend`)
      .reply(200, PerformanceData);

    const expectedActions = [
      { type: types.FETCH_FELLOWS_SUMMARY_REQUEST },
      {
        type: types.FETCH_FELLOWS_SUMMARY_SUCCESS,
        ...response
      }
    ];
    return store.dispatch(fetchFellowsSummaryOps()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  });
});
