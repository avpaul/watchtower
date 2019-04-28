import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import getManagerProfileData from '../managerProfileActions';
import { formatPerformanceData } from '../../../utils';
import {
  MANAGER_PROFILE_DATA_REQUEST,
  MANAGER_PROFILE_DATA_SUCCESS,
  MANAGER_PROFILE_DATA_FAILURE
} from '../../constants/managerActionTypes';
import managerProfileMock from '../../../__mocks__/managerProfile';

describe('Manager Profile Actions', () => {
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/managers/fellows/profile`;
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore({
    loading: false,
    data: [],
    error: null
  });

  const processedResponseData = {
    ...managerProfileMock,
    performance: {
      today: formatPerformanceData(managerProfileMock.performance.today),
      trend: formatPerformanceData(managerProfileMock.performance.trend)
    }
  };

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  const testAction = expectedActions => {
    store.dispatch(getManagerProfileData()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions.data).toEqual(expectedActions.data);
    });
  };

  it('dispatches MANAGER_PROFILE_DATA_REQUEST and MANAGER_PROFILE_DATA_SUCCESS on successfully fetching profile data', () => {
    mock.onGet(`${baseURL}`).reply(200, managerProfileMock);

    testAction([
      { type: MANAGER_PROFILE_DATA_REQUEST },
      {
        type: MANAGER_PROFILE_DATA_SUCCESS,
        data: processedResponseData
      }
    ]);
  });

  it('dispatches MANAGER_PROFILE_DATA_REQUEST and MANAGER_PROFILE_DATA_FAILURE on failing to fetch fellows', () => {
    testAction([
      { type: MANAGER_PROFILE_DATA_REQUEST },
      {
        type: MANAGER_PROFILE_DATA_FAILURE,
        error: 'Request failed with status code 404'
      }
    ]);
  });
});
