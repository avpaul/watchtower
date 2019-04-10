import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as fellowActions from '../fellowActions';
import * as types from '../../constants/fellowActionTypes';
import { ALL } from '../../constants/fellowFilters';
import fellows from '../../../__mocks__/fellows';
import pagination from '../../../__mocks__/pagination';
import initialState from '../../reducers/initialState';

const filter = ALL;

describe('Fellow Actions', () => {
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/fellows`;
  const perPage = 25;
  const page = 1;
  const level = 'all';
  const status = 'all';
  const statusType = 'all';
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const summary = {
    gteWk5OffTrack: 12,
    ltWk5OffTrack: 10,
    onTrack: 13
  };
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it('dispatches FELLOW_REQUEST and FELLOW_SUCCESS on successfully fetching fellows', () => {
    const data = {
      data: fellows,
      summary,
      ...pagination
    };
    mock
      .onGet(
        `${baseURL}?perPage=${perPage}&page=${page}&filter=${filter}&level=${level}&status=${status}&statusType=${statusType}`
      )
      .reply(200, { ...data });
    const expectedActions = [
      { type: types.LOAD_FELLOW_REQUEST },
      {
        type: types.LOAD_FELLOW_SUCCESS,
        fellows,
        summary,
        pagination
      }
    ];
    return store.dispatch(fellowActions.getFellows()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  });

  it('dispatches expected actions when called with search parameter', () => {
    const data = {
      data: fellows,
      summary,
      ...pagination
    };
    const search = 'West';
    mock
      .onGet(
        `${baseURL}?perPage=${perPage}&page=${page}&filter=${filter}&level=${level}&status=${status}&statusType=${statusType}&search=${search}`
      )
      .reply(200, { ...data });
    const expectedActions = [
      { type: types.LOAD_FELLOW_REQUEST },
      {
        type: types.LOAD_FELLOW_SUCCESS,
        fellows,
        summary,
        pagination
      }
    ];
    return store.dispatch(fellowActions.getFellows({ search })).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  });

  it('dispatches expected actions when called with url parameter', () => {
    const data = {
      data: fellows,
      summary,
      ...pagination
    };
    const requestURL = `${baseURL}?perPage=${perPage}&page=${page}&filter=${filter}`;
    mock.onGet(requestURL).reply(200, { ...data });
    const expectedActions = [
      { type: types.LOAD_FELLOW_REQUEST },
      {
        type: types.LOAD_FELLOW_SUCCESS,
        fellows,
        summary,
        pagination
      }
    ];
    return store
      .dispatch(fellowActions.getFellows({ url: requestURL }))
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toMatchObject(expectedActions);
      });
  });

  it('dispatches FELLOW_REQUEST and FELLOW_FAILURE on failing to fetch fellows', () => {
    const expectedActions = [
      { type: types.LOAD_FELLOW_REQUEST },
      {
        type: types.LOAD_FELLOW_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];
    return store.dispatch(fellowActions.getFellows()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
});

it('setVisibilityFilter returns the required action', () => {
  const expectedAction = { type: types.SET_VISIBILITY_FILTER, filter };
  const createdAction = fellowActions.setVisibilityFilter(filter);
  expect(createdAction).toEqual(expectedAction);
});
