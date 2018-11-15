import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  LOAD_TTLS_REQUEST,
  LOAD_TTLS_SUCCESS,
  LOAD_TTLS_FAILURE
} from '../../constants/ttlTypes';
import getTTLs, { getLocations } from '../ttlActions';
import {
  LOAD_LOCATIONS_REQUEST,
  LOAD_LOCATIONS_SUCCESS,
  LOAD_LOCATIONS_FAILURE
} from '../../constants/locationsTypes';

describe('TTLS Actions', () => {
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v1/ttls`;
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore({
    loading: false,
    ttls: [],
    error: null,
    location: []
  });
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it('dispatches LOAD_TTL_REQUEST and LOAD_TTL_SUUCESS on successfully fetching  ttls', () => {
    const data = {
      ttls: []
    };
    mock.onGet(`${baseURL}`).reply(200, { ...data });
    const expectedActions = [
      { type: LOAD_TTLS_REQUEST },
      {
        type: LOAD_TTLS_SUCCESS,
        ttls: {
          ttls: []
        }
      }
    ];
    return store.dispatch(getTTLs()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  });

  it('dispatches LOAD_LOCATIONS_REQUEST and LOAD_LOCATION_SUUCESS on successfully fetching location', () => {
    const data = {
      locations: []
    };
    const url = `${serverURL}/api/v1/locations`;
    mock.onGet(`${url}`).reply(200, { ...data });
    const expectedActions = [
      { type: LOAD_LOCATIONS_REQUEST },
      {
        type: LOAD_LOCATIONS_SUCCESS,
        locations: {
          locations: []
        }
      }
    ];
    return store.dispatch(getLocations()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  });

  it('dispatches LOAD_LOCATIONS_REQUEST and  LOAD_LOCATIONS_FAILURE on failing to fetch locations', () => {
    const expectedActions = [
      { type: LOAD_LOCATIONS_REQUEST },
      {
        type: LOAD_LOCATIONS_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];
    return store.dispatch(getLocations()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });

  it('dispatches LOAD_TTLS_REQUEST and  LOAD_LOCATIONS_FAILURE on failing to fetch ttls', () => {
    const expectedActions = [
      { type: LOAD_TTLS_REQUEST },
      {
        type: LOAD_TTLS_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];
    return store.dispatch(getTTLs()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
});
