import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { fetchAllCertifications } from '../cadreCertificationAction';

import * as types from '../../constants/cadreCertificationTypes';

describe('Fetch all roles action', () => {
  const initialState = {
    fetchAllCertifications: {
      loading: false,
      data: [],
      error: null
    }
  };

  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/ops/certifications`;

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  const testFetchAllCertificationsAction = (
    expectedResponse,
    apiResponse = [200, { message: 'Success!' }]
  ) => {
    mock.onGet(baseURL).reply(...apiResponse);

    const expectedActions = [
      { type: types.FETCH_CERTIFICATION_REQUEST },
      expectedResponse
    ];

    store.dispatch(fetchAllCertifications()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  };

  it('creates FETCH_CERTIFICATION_SUCCESS when the get request completes successfully', () => {
    testFetchAllCertificationsAction({
      type: types.FETCH_CERTIFICATION_SUCCESS,
      data: {}
    });
  });

  it('creates FETCH_CERTIFICATION_FAILURE when the GET request encounters an error', () => {
    testFetchAllCertificationsAction(
      {
        type: types.FETCH_CERTIFICATION_FAILURE,
        error: 'Internal Server Error!'
      },
      [500, { message: 'Internal Server Error!' }]
    );
  });
});
