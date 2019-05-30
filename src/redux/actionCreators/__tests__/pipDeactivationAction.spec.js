import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import {
  DEACTIVATION_FAILURE,
  DEACTIVATION_SUCCESS,
  DEACTIVATION_REQUEST
} from '../../constants/pipDeactivationTypes';
import deactivatePIPAction, {
  deactivatePipSuccess,
  deactivatePip
} from '../pipDeactivationActions';

const serverUrl = process.env.REACT_APP_WATCHTOWER_SERVER;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('should deactivate PIP and succeed', () => {
  let mock;
  let store;
  let fellowId;
  let url;
  const history = { push: jest.fn() };

  beforeEach(() => {
    store = mockStore({});
    mock = new MockAdapter(axios);
    fellowId = 'fhhkjfhkhakhff';
    url = `${serverUrl}/api/v2/fellows/${fellowId}/ratings-pip/-`;
  });

  afterEach(() => {
    mock.reset();
    mock.restore();
    store.clearActions();
  });

  it('should try to deactivate PIP', () => {
    const expectedAction = {
      type: DEACTIVATION_REQUEST
    };
    expect(deactivatePip({})).toEqual(expectedAction);
  });

  it('should deactivate PIP and succeed', () => {
    const expectedActions = {
      type: DEACTIVATION_SUCCESS
    };
    expect(deactivatePipSuccess()).toEqual(expectedActions);
  });

  it('should try to deactivate pip and fail', done => {
    mock.onPut(url).reply(400);
    const expectedAction = [
      { type: DEACTIVATION_REQUEST },
      {
        error: 'Request failed with status code 400',
        type: DEACTIVATION_FAILURE
      }
    ];
    store
      .dispatch(deactivatePIPAction(fellowId, history))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      })
      .then(done)
      .catch(done.fail);
  });

  it('should deactivate pip and succeed', done => {
    mock.onPut(url).reply(200);
    const expectedAction = [
      { type: DEACTIVATION_REQUEST },
      { type: DEACTIVATION_SUCCESS }
    ];
    store
      .dispatch(deactivatePIPAction(fellowId, history))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      })
      .then(done)
      .catch(done.fail);
  });
});
