import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import * as types from '../../constants/cadreEngineersTypes';
import { activateCadreEngineerAccount } from '../activateCadreEngineerActions';

const serverUrl = process.env.REACT_APP_WATCHTOWER_SERVER;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Cadre Engineer Account Activation', () => {
  describe('Integration Tests', () => {
    let mock;
    let store;
    let url;
    beforeEach(() => {
      store = mockStore({});
      mock = new MockAdapter(axios);
      url = `${serverUrl}/api/v2/fellows/profile/cadre/activation`;
    });

    afterEach(() => {
      mock.reset();
      mock.restore();
      store.clearActions();
    });

    it('should send request to activate cadre engineer account and fail', done => {
      mock.onPut(url).reply(400);
      const expectedAction = [
        { type: types.ACTIVATE_CADRE_ENGINEER_ACCOUNT_REQUEST },
        {
          error: 'Request failed with status code 400',
          type: types.ACTIVATE_CADRE_ENGINEER_ACCOUNT_FAILURE
        }
      ];
      store
        .dispatch(activateCadreEngineerAccount())
        .then(() => expect(store.getActions()).toEqual(expectedAction))
        .then(done)
        .catch(done.fail);
    });

    it('should send request to activate cadre engineer account and succeed', done => {
      const fellow = {
        id: 1,
        email: 'test@example.com',
        account_active: true
      };

      mock.onPut(url).reply(200, { fellow });
      const expectedAction = [
        { type: types.ACTIVATE_CADRE_ENGINEER_ACCOUNT_REQUEST },
        {
          type: types.ACTIVATE_CADRE_ENGINEER_ACCOUNT_SUCCESS,
          engineer: fellow
        }
      ];
      store
        .dispatch(activateCadreEngineerAccount({ push: jest.fn() }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedAction);
        })
        .then(done)
        .catch(done.fail);
    });
  });
});
