import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  LOAD_MANAGERFELLOWS_REQUEST,
  LOAD_MANAGERFELLOWS_SUCCESS,
  LOAD_MANAGERFELLOWS_FAILURE
} from '../constants/managerFellowTypes';
import getManagerFellows from './managerFellowsAction';

describe('Manager Fellow Actions', () => {
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v1/managers/fellows?email=test.lass@mail.com`;
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore({
    loading: false,
    managerFellows: {},
    error: null
  });
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it('dispatches LOAD_MANAGERFELLOWS_REQUEST and LOAD_MANAGERFELLOWS_SUCCESS on successfully fetching managers fellows', () => {
    const data = {
      managerFellows: []
    };
    mock.onGet(`${baseURL}`).reply(200, { ...data });
    const expectedActions = [
      { type: LOAD_MANAGERFELLOWS_REQUEST },
      {
        type: LOAD_MANAGERFELLOWS_SUCCESS,
        managerFellows: {
          managerFellows: []
        }
      }
    ];
    return store
      .dispatch(getManagerFellows({ email: 'test.lass@mail.com' }))
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toMatchObject(expectedActions);
      });
  });

  it('dispatches LOAD_MANAGERFELLOWS_REQUEST and  LOAD_MANAGERFELLOWS_FAILURE on failing to fetch managers fellows', () => {
    const expectedActions = [
      { type: LOAD_MANAGERFELLOWS_REQUEST },
      {
        type: LOAD_MANAGERFELLOWS_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];
    return store.dispatch(getManagerFellows({ email: '' })).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
});
