import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import waitForExpect from 'wait-for-expect';
import { editProjectVacancies } from '../../projectVacancyActions';

import {
  EDIT_PROJECT_VACANCIES_SUCCESS,
  EDIT_PROJECT_VACANCIES_REQUEST,
  EDIT_PROJECT_VACANCIES_FAILURE
} from '../../../constants/projectsTypes';

describe('Update project vacancies action', () => {
  const initialState = {
    editProjectVacancies: {
      loading: false,
      data: {},
      error: ''
    }
  };

  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/projects/vacancies/-`;

  const defaultAPIResponse = {
    message: 'You have successfully updated some project vacancies!',
    data: {
      project: {},
      role: {},
      vacancies: []
    }
  };

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  /**
   * Test the editProjectVacancies action according to the api response and the expected editProjectVacancies data
   * @param object Expected action data
   * @param array Mock API response
   */
  const testUpdateProjectVacanciesAction = async (
    expectedResponse,
    apiResponse = [200, defaultAPIResponse]
  ) => {
    mock.onPut(baseURL).reply(...apiResponse);

    const expectedActions = [
      { type: EDIT_PROJECT_VACANCIES_REQUEST },
      ...expectedResponse
    ];

    store.dispatch(editProjectVacancies({}));
    await waitForExpect(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  };

  it('creates EDIT_PROJECT_VACANCIES_SUCCESS when the PUT request completes successfully', async () => {
    await testUpdateProjectVacanciesAction([
      {
        type: EDIT_PROJECT_VACANCIES_SUCCESS,
        data: defaultAPIResponse.data
      },
      {
        data: defaultAPIResponse.data,
        type: 'UPDATE_PROJECT_VACANCIES_ON_FOCUS'
      }
    ]);
  });

  it('creates EDIT_PROJECT_VACANCIES_FAILURE when the PUT request encounters an error', async () => {
    const error = 'Invalid project id!';
    await testUpdateProjectVacanciesAction(
      [
        {
          type: EDIT_PROJECT_VACANCIES_FAILURE,
          error
        }
      ],
      [422, { message: error }]
    );
  });
});
