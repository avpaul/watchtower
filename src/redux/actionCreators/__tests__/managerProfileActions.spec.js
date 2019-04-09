import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import getManagerProfileData from '../managerProfileActions';
import {
  MANAGER_PROFILE_DATA_REQUEST,
  MANAGER_PROFILE_DATA_SUCCESS,
  MANAGER_PROFILE_DATA_FAILURE
} from '../../constants/managerActionTypes';

describe('TTLS Project Actions', () => {
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/managers/fellows/profile`;
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore({
    loading: false,
    projects: [],
    error: null
  });
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  const testAction = expectedActions => {
    store.dispatch(getManagerProfileData()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  };

  it('dispatches MANAGER_PROFILE_DATA_REQUEST and MANAGER_PROFILE_DATA_SUCCESS on successfully fetching profile data', () => {
    const projects = {
      projects: {
        data: {
          totalFellows: 4,
          projects: {
            Watchtower: 2,
            Activo: 1,
            Converge: 1
          }
        }
      }
    };
    mock.onGet(`${baseURL}`).reply(200, { ...projects });
    testAction([
      { type: MANAGER_PROFILE_DATA_REQUEST },
      {
        type: MANAGER_PROFILE_DATA_SUCCESS,
        projects
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
