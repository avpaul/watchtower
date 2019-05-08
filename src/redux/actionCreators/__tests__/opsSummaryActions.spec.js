import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import getOpsSummary from '../opsSummaryActions';
import * as types from '../../constants/managerActionTypes';
import fellowManagers from '../../../__mocks__/fellowManagers';
import initialState from '../../reducers/initialState';

describe('Ops Summary Actions', () => {
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/managers/ops`;
  const managers = fellowManagers;
  const averageFellowsPerLf = fellowManagers;

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  /**
   * Tests the dispatch of the ops summary actions
   * @param array Expected dispatched actions to test for
   */
  const testStoreAction = expectedActions => {
    store.dispatch(getOpsSummary()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  };

  it('dispatches MANAGER_REQUEST and MANAGER_SUCCESS on fetching managers', () => {
    mock
      .onGet(`${baseURL}`)
      .reply(200, { ...{ data: { data: { averageFellowsPerLf } } } });
    const expectedActions = [
      { type: types.LOAD_OPS_SUMMARY_REQUEST },
      { type: types.LOAD_OPS_SUMMARY_SUCCESS, data: managers }
    ];

    testStoreAction(expectedActions);
  });

  it('dispatches MANAGER_REQUEST and MANAGER_FAILURE on failing to fetch managers', () => {
    const expectedActions = [
      { type: types.LOAD_OPS_SUMMARY_REQUEST },
      {
        type: types.LOAD_OPS_SUMMARY_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];
    testStoreAction(expectedActions);
  });
});
