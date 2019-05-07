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
import fellowsByCohortMock from '../../../__mocks__/fellowsByCohort.json';

import getFellowProgress from '../fellowProgressActions';
import { groupByLevel } from '../../../services/fellowsProgressService';

describe('Fellow Actions', () => {
    const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
    const baseURL = `${serverURL}/api/v2/fellows/filter`;
    const mockStore = configureStore([thunk]);
    const mock = new MockAdapter(axios);
    const store = mockStore({
      loading: false,
      data: {
        D0A: [],
        D0B: [],
        D0: []
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
        .onGet(`${baseURL}`)
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

    it('dispatches LOAD_FELLOW_PROGRESS_REQUEST and LOAD_FELLOW_PROGRESS_SUCCESS on successful fetch of fellows progress', () => {
     
      mock
        .onGet(`${baseURL}`)
        .reply(200, fellowsByCohortMock);
  
      const expectedActions = [
        { type: LOAD_FELLOW_PROGRESS_REQUEST },
        {
          type: LOAD_FELLOW_PROGRESS_SUCCESS,
          payload: groupByLevel(Object.values(fellowsByCohortMock))
        }
      ];
      return store.dispatch(getFellowProgress()).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toMatchObject(expectedActions);
      });
    });

  });
  