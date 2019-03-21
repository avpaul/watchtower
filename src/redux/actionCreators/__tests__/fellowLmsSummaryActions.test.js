import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import jsonwebtoken from 'jsonwebtoken';
import Cookie from 'js-cookie';
import {
  LOAD_FELLOW_LMS_SUMMARY_REQUEST,
  LOAD_FELLOW_LMS_SUMMARY_SUCCESS,
  LOAD_FELLOW_LMS_SUMMARY_FAILURE
} from '../../constants/fellowActionTypes';
import initialState from '../../reducers/initialState';
import getFellowLmsSummary from '../fellowLmsSummaryActions';

describe('LMS Actions', () => {
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const email = 'test.user@andela.com';
  const baseURL = `${serverURL}/api/v1/fellows/lms?email=${email}`;
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);

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

  it('dispatches LOAD_FELLOW_LMS_SUMMARY_REQUEST and LOAD_FELLOW_LMS_SUMMARY_SUCCESS on successfully fetching fellow summary', () => {
    const data = {
      data: []
    };
    mock.onGet(baseURL).reply(200, { ...data });
    const expectedActions = [
      { type: LOAD_FELLOW_LMS_SUMMARY_REQUEST },
      {
        type: LOAD_FELLOW_LMS_SUMMARY_SUCCESS,
        lmsSummary: { data: [] }
      }
    ];
    return store.dispatch(getFellowLmsSummary()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  });

  it('dispatches LOAD_FELLOW_LMS_SUMMARY_REQUEST and LOAD_FELLOW_LMS_SUMMARY_FAILURE on failing to fetch fellow submissions', () => {
    const expectedActions = [
      { type: LOAD_FELLOW_LMS_SUMMARY_REQUEST },
      {
        type: LOAD_FELLOW_LMS_SUMMARY_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];
    return store.dispatch(getFellowLmsSummary()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
});
