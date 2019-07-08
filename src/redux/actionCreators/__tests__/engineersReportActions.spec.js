import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import { serializeQuery } from '../helpers';
import * as types from '../../constants/engineersReportTypes';
import fetchEngineersReportActions, {
  fetchEngineersRequest,
  fetchEngineersSuccess,
  fetchEngineersFailure
} from '../engineersReportActions';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('should fetch cadre engineers and succeed', () => {
  let mock;
  let store;
  let url;
  let queryParams;

  beforeEach(() => {
    store = mockStore({ reports: { meta: { page: 1, perPage: 10 } } });
    mock = new MockAdapter(axios);
    const { meta } = store.getState().reports;
    queryParams = { page: meta.page, limit: meta.perPage };
    url = `${serverURL}/api/v2/ops/reports/engineers?${serializeQuery(
      queryParams
    )}`;
  });

  afterEach(() => {
    mock.reset();
    mock.restore();
    store.clearActions();
  });

  it('should try to fetch cadre engineers', () => {
    const expectedAction = {
      type: types.FETCH_ENGINEER_REPORT_REQUEST
    };
    expect(fetchEngineersRequest({})).toEqual(expectedAction);
  });

  it('should fetch and succeed', () => {
    const expectedAction = {
      data: {},
      type: types.FETCH_ENGINEER_REPORT_SUCCESS
    };
    expect(fetchEngineersSuccess({})).toEqual(expectedAction);
  });

  it('should fetch and fail', () => {
    const expectedAction = {
      error: {},
      type: types.FETCH_ENGINEER_REPORT_FAILURE
    };
    expect(fetchEngineersFailure({})).toEqual(expectedAction);
  });

  it('should try to get cadre engineers and fail', done => {
    mock.onGet(url).reply(400);
    const expectedAction = [
      { type: types.FETCH_ENGINEER_REPORT_REQUEST },
      {
        error: 'Request failed with status code 400',
        type: types.FETCH_ENGINEER_REPORT_FAILURE
      }
    ];
    store
      .dispatch(fetchEngineersReportActions())
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      })
      .then(done)
      .catch(done.fail);
  });

  it('should fetch engineers and succeed', done => {
    const res = 'Fetched';
    mock.onGet(url).reply(200, res);
    const expectedAction = [
      { type: types.FETCH_ENGINEER_REPORT_REQUEST },
      {
        data: {
          data: res,
          meta: { page: 1, perPage: 10 }
        },
        type: types.FETCH_ENGINEER_REPORT_SUCCESS
      }
    ];
    store
      .dispatch(fetchEngineersReportActions())
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      })
      .then(done)
      .catch(done.fail);
  });
});
