import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import waitForExpect from 'wait-for-expect';

import {
  fetchAllCertifications,
  deleteCertification
} from '../cadreCertificationActions';

import * as types from '../../constants/cadreCertificationTypes';

describe('Test for certification actions', () => {
  const initialState = {
    fetchAllCertifications: {
      loading: false,
      data: [],
      error: null
    },
    deleteCertification: {
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
  describe('Fetch all certification action', () => {
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

  describe('Delete certification action', () => {
    const testDeleteCertificationsAction = async (
      expectedResponse,
      apiResponse = [200, { message: 'Success!' }]
    ) => {
      mock.onDelete(`${baseURL}/1`).reply(...apiResponse);

      const expectedActions = [
        { type: types.DELETE_CERTIFICATION_REQUEST },
        ...expectedResponse
      ];

      store.dispatch(deleteCertification(1));

      await waitForExpect(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toMatchObject(expectedActions);
      });
    };

    it('creates DELETE_CERTIFICATION_SUCCESS when certification is deleted successfully', async () => {
      await testDeleteCertificationsAction([
        {
          type: types.DELETE_CERTIFICATION_SUCCESS,
          data: { message: 'Success!' }
        },
        {
          type: types.REMOVE_CERTIFICATION_ON_FOCUS,
          data: 1
        }
      ]);
    });

    it('creates FETCH_CERTIFICATION_FAILURE when the delete request encounters an error', () => {
      testDeleteCertificationsAction(
        {
          type: types.DELETE_CERTIFICATION_FAILURE,
          error: 'Internal Server Error!'
        },
        [500, { message: 'Internal Server Error!' }]
      );
    });
  });
});
