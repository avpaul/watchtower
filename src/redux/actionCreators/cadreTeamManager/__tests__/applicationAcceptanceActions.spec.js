import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { acceptApplication } from '../acceptApplicationActions';

import * as types from '../../../constants/cadreTeamManager/applicationsTypes';

describe('Fetch all applications action', () => {
  const initialState = {
    teamManagerProjectApplications: {
      loading: false,
      error: null,
      data: {
        pending: [
          {
            id: 12,
            fellow_id: '-LP5MeqRJFJQGKwfG1vd',
            project_id: 40,
            project_role_id: 4,
            project_vacancy_id: null,
            decision: 'pending',
            cycle_id: 1,
            applicant: {
              id: 4,
              fellow_id: '-LP5MeqRJFJQGKwfG1vd',
              first_name: 'Edward',
              last_name: 'Kigozi',
              email: 'edward.kigozi@andela.com'
            },
            project: {
              id: 40,
              name: 'Quia qui.'
            },
            role: {
              id: 4,
              name: 'QA Engineer'
            }
          }
        ]
      }
    }
  };

  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/projects/manager/applications/`;

  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });

  afterEach(() => {
    mock.reset();
    moxios.uninstall();
  });

  /**
   * Test application acceptance
   *
   * @param object Expected action data
   * @param array Mock API response
   */
  const testAcceptApplicationAction = (
    expectedResponse,
    apiResponse = [200, { message: 'Success!' }]
  ) => {
    mock.onPost(`${baseURL}1/accept`).reply(...apiResponse);

    const expectedActions = [
      { type: types.ACCEPT_PROJECT_APPLICATIONS_REQUEST },
      expectedResponse
    ];

    store.dispatch(acceptApplication(1)).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  };

  it('creates ACCEPT_PROJECT_APPLICATIONS_SUCCESS when the POST request completes successfully', () => {
    testAcceptApplicationAction({
      type: types.ACCEPT_PROJECT_APPLICATIONS_SUCCESS,
      data: {}
    });
  });

  it('creates ACCEPT_PROJECT_APPLICATIONS_FAILURE when the POST request encounters an error', () => {
    testAcceptApplicationAction(
      {
        type: types.ACCEPT_PROJECT_APPLICATIONS_FAILURE,
        error: 'Internal Server Error!'
      },
      [500, { message: 'Internal Server Error!' }]
    );
  });
});
