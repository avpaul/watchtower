import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import getManagers  from './managerActions';
import * as types from '../constants/managerActionTypes';
import fellowManagers from '../../__mocks__/fellowManagers';
import initialState from '../reducers/initialState';

describe('Manager Actions', () => {
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v1/managers`;
  const managers = fellowManagers;
  
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it('dispatches MANAGER_REQUEST and MANAGER_SUCCESS on fetching managers', () => {
    const data = {
      data: managers
    };
    mock.onGet(`${baseURL}`).reply(200, { ...data });
    const expectedActions = [
      { type: types.LOAD_MANAGER_REQUEST },
      { type: types.LOAD_MANAGER_SUCCESS, managers }
    ];
    return store.dispatch(getManagers()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  });

  it('dispatches MANAGER_REQUEST and MANAGER_FAILURE on failing to fetch managers', () => {
    const expectedActions = [
      { type: types.LOAD_MANAGER_REQUEST },
      {
        type: types.LOAD_MANAGER_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];
    return store.dispatch(getManagers()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    })
  })
});
