import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import * as types from '../../constants/cadreEngineersTypes';
import getCadreEngineers, {
  getCadreEngineersRequest,
  getCadreEngineersSuccess,
  getCadreEngineersFailure,
  activateCadreEngineerAccountRequest,
  activateCadreEngineerAccountSuccess,
  activateCadreEngineerAccountFailure
} from '../cadreEngineersActions';

const serverUrl = process.env.REACT_APP_WATCHTOWER_SERVER;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('should fetch cadre engineers and succeed', () => {
  let mock;
  let store;
  let url;
  beforeEach(() => {
    store = mockStore({});
    mock = new MockAdapter(axios);
    url = `${serverUrl}/api/v2/d1engineers`;
  });

  afterEach(() => {
    mock.reset();
    mock.restore();
    store.clearActions();
  });

  it('should try to fetch cadre engineers', () => {
    const expectedAction = {
      type: types.FETCH_CADRE_REQUEST
    };
    expect(getCadreEngineersRequest({})).toEqual(expectedAction);
  });

  it('should fetch and succeed', () => {
    const expectedAction = { engineers: {}, type: types.FETCH_CADRE_SUCCESS };
    expect(getCadreEngineersSuccess({})).toEqual(expectedAction);
  });

  it('should fetch and fail', () => {
    const expectedAction = { error: {}, type: types.FETCH_CADRE_FAILURE };
    expect(getCadreEngineersFailure({})).toEqual(expectedAction);
  });

  it('should try to get cadre engineers and fail', done => {
    mock.onGet(url).reply(400);
    const expectedAction = [
      { type: types.FETCH_CADRE_REQUEST },
      {
        error: 'Request failed with status code 400',
        type: types.FETCH_CADRE_FAILURE
      }
    ];
    store
      .dispatch(getCadreEngineers())
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      })
      .then(done)
      .catch(done.fail);
  });

  it('should deactivate pip and succeed', done => {
    mock.onGet(url).reply(200);
    const expectedAction = [
      { type: types.FETCH_CADRE_REQUEST },
      { type: types.FETCH_CADRE_SUCCESS }
    ];
    store
      .dispatch(getCadreEngineers())
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      })
      .then(done)
      .catch(done.fail);
  });
});

describe('Cadre Engineer Account Activation', () => {
  describe('Action Creators', () => {
    it('should start Cadre account activation process', () => {
      const expectedAction = {
        type: types.ACTIVATE_CADRE_ENGINEER_ACCOUNT_REQUEST
      };
      expect(activateCadreEngineerAccountRequest()).toEqual(expectedAction);
    });

    it('should activate a Cadre engineer account successfully', () => {
      const expectedAction = {
        type: types.ACTIVATE_CADRE_ENGINEER_ACCOUNT_SUCCESS,
        engineer: {}
      };
      expect(activateCadreEngineerAccountSuccess({})).toEqual(expectedAction);
    });

    it('should fail to activate a Cadre engineer account', () => {
      const expectedAction = {
        type: types.ACTIVATE_CADRE_ENGINEER_ACCOUNT_FAILURE,
        error: 'Something bad happened'
      };
      expect(
        activateCadreEngineerAccountFailure('Something bad happened')
      ).toEqual(expectedAction);
    });
  });
});
