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
import getFellowProgress from '../fellowProgressActions';

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

  it('dispatches LOAD_FELLOW_PROGRESS_REQUEST and LOAD_FELLOW_PROGRESS_SUCCESS on successfully fetching fellows progress', () => {
    const data = {
      fellowsProgressD0A: [],
      fellowsProgressD0B: [],
      fellowsProgressD0: []
    };
    mock
      .onGet(`${baseURL}&level=D0A`)
      .reply(200, data.fellowsProgressD0A)
      .onGet(`${baseURL}&level=D0B`)
      .reply(200, data.fellowsProgressD0B);
    const expectedActions = [
      { type: LOAD_FELLOW_PROGRESS_REQUEST },
      {
        type: LOAD_FELLOW_PROGRESS_SUCCESS,
        payload: data
      }
    ];
    return store.dispatch(getFellowProgress()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  });

  it('dispatches LOAD_FELLOW_PROGRESS_REQUEST and LOAD_FELLOW_PROGRESS_FAILURE on failure to fetch fellows progress', () => {
    const error = { message: 'Network failure' };
    mock
      .onGet(`${baseURL}&level=D0A`)
      .reply(500, error)
      .onGet(`${baseURL}&level=D0B`)
      .reply(500, error);

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
});
