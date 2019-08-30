import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { addCertification } from '../cadreAddCertificationAction';

import * as types from '../../constants/cadreAddCertificationTypes';

describe('Create certifications action', () => {
  const initialState = {
    addCertification: {
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

  const testAddCertificationsAction = async (
    expectedResponse,
    apiResponse = [200, { message: 'Success!' }],
    data = {}
  ) => {
    mock.onPost(baseURL).reply(...apiResponse);

    const expectedActions = [
      { type: types.ADD_CERTIFICATION_SUCCESS },
      expectedResponse
    ];

    await store.dispatch(addCertification(data)).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  };

  it('creates ADD_CERTIFICATION_SUCCESS', () => {
    testAddCertificationsAction({
      type: types.ADD_CERTIFICATION_SUCCESS,
      data: {}
    });
  });

  it('test ADD_CERTIFICATION_FAILURE ', () => {
    testAddCertificationsAction(
      {
        type: types.ADD_CERTIFICATION_FAILURE,
        error: 'Internal Server Error!'
      },
      [500, { message: 'Internal Server Error!' }]
    );
  });
});
