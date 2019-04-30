import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import jsonwebtoken from 'jsonwebtoken';
import Cookie from 'js-cookie';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  LOAD_FELLOW_PROGRESS_REQUEST,
  LOAD_FELLOW_PROGRESS_SUCCESS,
  LOAD_FELLOW_PROGRESS_FAILURE
} from '../../constants/fellowProgressTypes';

import getFellowProgress, {
  getEmFellowsProgress
} from '../fellowProgressActions';

describe('Fellow Actions', () => {
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v1/fellows/cohorts?location=all&ttl=all`;
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore({
    loading: false,
    data: {
      fellowsProgressD0A: [],
      fellowsProgressD0B: [],
      fellowsProgressD0: []
    },
    error: null
  });
  beforeAll(() => {
    const user = {
      UserInfo: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test.user@andela.com',
        name: 'Test User'
      }
    };
    const token = jsonwebtoken.sign(user, 'shhhhh');
    Cookie.set = jest.fn(() => token);
    Cookie.set('jwt-token', token, { domain: '.andela.com' });
    Cookie.get = jest.fn(() => token);
    Cookie.remove = jest.fn();
  });

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it('dispatches LOAD_FELLOW_PROGRESS_REQUEST and LOAD_FELLOW_PROGRESS_FAILURE on failure to fetch fellows progress', () => {
    const error = { message: 'Request failed with status code 404' };
    mock
      .onGet(`${baseURL}&level=D0A`)
      .reply(404, error)
      .onGet(`${baseURL}&level=D0B`)
      .reply(404, error);

    const expectedActions = [
      { type: LOAD_FELLOW_PROGRESS_REQUEST },
      {
        type: LOAD_FELLOW_PROGRESS_FAILURE,
        error: error.message
      }
    ];
    return store.dispatch(getFellowProgress()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  });

  it('getEmFellowsProgress dispatches LOAD_FELLOW_PROGRESS_SUCCESS if successful', () => {
    mock
      .onGet(`${serverURL}/api/v1/engineeringmanagers/fellows`)
      .reply(200, []);

    const expectedActions = [
      { type: LOAD_FELLOW_PROGRESS_SUCCESS, payload: { fellowsProgressD0: [] } }
    ];
    return store.dispatch(getEmFellowsProgress({})).then(() => {
      expect(store.getActions()).toMatchObject(expectedActions);
    });
  });

  it('getEmFellowsProgress dispatches LOAD_FELLOW_PROGRESS_FAILURE if the request fails', () => {
    mock
      .onGet(`${serverURL}/api/v1/engineeringmanagers/fellows`)
      .reply(500, 'Network failed');

    const expectedActions = [{ type: LOAD_FELLOW_PROGRESS_FAILURE }];
    return store.dispatch(getEmFellowsProgress({})).then(() => {
      expect(store.getActions()).toEqual(
        expect.objectContaining(expectedActions)
      );
    });
  });
});
