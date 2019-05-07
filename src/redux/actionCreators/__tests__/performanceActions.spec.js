import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import performanceAction from '../performanceActions';
import { formatPerformanceData } from '../../../utils';
import managerProfileMock from '../../../__mocks__/managerProfile';

import {
  FETCH_PERFORMANCE_DATA_REQUEST,
  FETCH_PERFORMANCE_DATA_SUCCESS,
  FETCH_PERFORMANCE_DATA_FAILURE
} from '../../constants/performanceTypes';

describe('Performance Data', () => {
  const response = {
    performance: {
      today: managerProfileMock.performance.today,
      trend: managerProfileMock.performance.trend
    }
  };

  const processedPerformanceData = {
    today: formatPerformanceData(managerProfileMock.performance.today),
    trend: formatPerformanceData(managerProfileMock.performance.trend)
  };

  const initialState = {
    performanceData: {
      loading: false,
      data: processedPerformanceData,
      error: ''
    }
  };

  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/managers/fellows/performance`;

  beforeEach(() => {
    store.clearActions();
  });
  afterEach(() => {
    mock.reset();
  });

  /**
   * Test the performance action according to the api response and the expected performance data
   * @param object Expected action data
   * @param array Mock API response
   */
  const testPerformanceAction = (
    expectedResponse,
    apiResponse = [200, response]
  ) => {
    mock.onGet(baseURL).reply(...apiResponse);

    const expectedActions = [
      { type: FETCH_PERFORMANCE_DATA_REQUEST },
      expectedResponse
    ];

    store.dispatch(performanceAction()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  };

  it('creates FETCH_PERFORMANCE_DATA_SUCCESS when fetching fellows performance is done', () => {
    testPerformanceAction({
      type: FETCH_PERFORMANCE_DATA_SUCCESS,
      data: processedPerformanceData
    });
  });

  it('creates FETCH_PERFORMANCE_DATA_SUCCESS when fetching fellows history performance is done', () => {
    testPerformanceAction({
      type: FETCH_PERFORMANCE_DATA_SUCCESS,
      data: {
        today: processedPerformanceData.today
      }
    });
  });
  it('creates FETCH_PERFORMANCE_DATA_SUCCESS when fetching fellows trend performance is done', () => {
    testPerformanceAction({
      type: FETCH_PERFORMANCE_DATA_SUCCESS,
      data: {
        trend: processedPerformanceData.trend
      }
    });
  });

  it('creates FETCH_PERFORMANCE_DATA_FAILURE when fetching fellows performance is done', () => {
    testPerformanceAction(
      {
        type: FETCH_PERFORMANCE_DATA_FAILURE,
        error: 'Request failed with status code 403'
      },
      [403]
    );
  });
});
