import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { fetchApplicantApplication } from '../applicantActions';

import * as types from '../../../constants/cadreTeamManager/applicationsTypes';

describe('Fetch all applications action', () => {
  const initialState = {
    teamManagerProjectApplications: {
      loading: false,
      data: [],
      error: null
    }
  };

  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/projects/manager/applications/1`;

  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });

  afterEach(() => {
    mock.reset();
    moxios.uninstall();
  });

  /**
   * Test the fetch all applications action according to the api response
   *
   * @param object Expected action data
   * @param array Mock API response
   */
  const testfetchApplicationsAction = (
    expectedResponse,
    apiResponse = [200, { message: 'Success!' }]
  ) => {
    mock.onGet(baseURL).reply(...apiResponse);

    const expectedActions = [
      { type: types.FETCH_SINGLE_APPLICATIONS_REQUEST },
      expectedResponse
    ];

    store.dispatch(fetchApplicantApplication()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  };

  it('creates FETCH_APPLICATIONS_SUCCESS when the get request completes successfully', () => {
    testfetchApplicationsAction({
      type: types.FETCH_SINGLE_APPLICATIONS_SUCCESS,
      data: {}
    });
  });

  it('creates FETCH_APPLICATIONS_FAILURE when the GET request encounters an error', () => {
    testfetchApplicationsAction(
      {
        type: types.FETCH_SINGLE_APPLICATIONS_FAILURE,
        error: 'Internal Server Error!'
      },
      [500, { message: 'Internal Server Error!' }]
    );
  });
});
