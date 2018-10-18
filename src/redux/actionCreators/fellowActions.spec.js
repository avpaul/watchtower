import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as fellowActions from './fellowActions';
import * as types from '../constants/fellowActionTypes';
import fellows from '../../__mocks__/fellows';
import pagination from '../../__mocks__/pagination';
import initialState from '../reducers/initialState';

describe('Fellow Actions', () => {
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const perPage = 10;
  const page = 1;
  const filter = 'onTrack';
  const mockStore = configureStore([thunk]);
  const store = mockStore(initialState);
  const summary = {
    gteWk5OffTrack: 12,
    ltWk5OffTrack: 10,
    onTrack: 13,
  };
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  describe('Test suite for GET Fellows Actions', () => {
    it('dispatches FELLOW_REQUEST and FELLOW_SUCCESS on successfully fetching fellows', () => {
      const data = {
        payload: fellows,
        summary,
        ...pagination,
      };
      moxios.stubRequest(`${serverURL}?perPage=${perPage}&page=${page}&filter=${filter}`, {
        status: 200,
        response: data,
      });
      const expectedActions = [
        { type: types.LOAD_FELLOW_REQUEST },
        {
          type: types.LOAD_FELLOW_SUCCESS,
          fellows,
          summary,
          pagination,
        },
      ];
      return store.dispatch(fellowActions.getFellows()).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toMatchObject(expectedActions);
      });
    });

    it('dispatches FELLOW_REQUEST and FELLOW_FAILURE on failing fetch fellows', () => {
      moxios.stubRequest(`${serverURL}?perPage=${perPage}&page=${page}&filter=${filter}`, {
        status: 400,
        response: 'problem',
      });
      const expectedActions = [
        { type: types.LOAD_FELLOW_REQUEST },
        {
          type: types.LOAD_FELLOW_FAILURE,
          error: 'problem',
        },
      ];
      return store.dispatch(fellowActions.getFellows()).then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
    });
  });
});
