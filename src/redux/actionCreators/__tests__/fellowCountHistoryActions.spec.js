import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import fellowCountHistoryActions from '../fellowCountHistoryActions';
import * as types from '../../constants/fellowCountHistory';
import countSummary from '../../../__mocks__/countSummary';
import initialState from '../../reducers/initialState';

describe('Fellow Count History', () => {
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const requestURL = `${serverURL}/api/v1/fellows/summary`;

  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it('dispatches FELLOW_REQUEST and FELLOW_SUCCESS on successfully fetching countSummary', () => {
    mock.onGet(requestURL).reply(200, countSummary);
    const expectedActions = [
      { type: types.LOAD_FELLOW_COUNT_HISTORY_REQUEST },
      {
        type: types.LOAD_FELLOW_COUNT_HISTORY_SUCCESS,
        countSummary
      }
    ];
    return store.dispatch(fellowCountHistoryActions()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  });

  it('dispatches FELLOW_REQUEST and FELLOW_FAILURE on failing to fetch countSummary', () => {
    const expectedActions = [
      { type: types.LOAD_FELLOW_COUNT_HISTORY_REQUEST },
      {
        type: types.LOAD_FELLOW_COUNT_HISTORY_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];
    return store.dispatch(fellowCountHistoryActions()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
});
