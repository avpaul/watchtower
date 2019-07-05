import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import waitForExpect from 'wait-for-expect';

import {
  DELETE_PROJECT_VACANCIES_REQUEST,
  DELETE_PROJECT_VACANCIES_SUCCESS,
  DELETE_PROJECT_VACANCIES_FAILURE,
  REMOVE_PROJECT_VACANCIES_ON_FOCUS
} from '../../../constants/projectsTypes';

import { deleteProjectVacancies } from '../../projectVacancyActions';

describe('Delete all project vacancies action', () => {
  const initialState = {
    deleteProjectVacancies: {
      loading: false,
      data: {},
      error: ''
    }
  };

  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/projects/vacancies`;

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  /**
   * Test the delete all project vacancies action according to the api response
   *
   * @param object Expected action data
   * @param array Mock API response
   */
  const testDeleteProjectVacanciesAction = async (
    expectedResponse,
    apiResponse = [200, { message: 'Success!' }]
  ) => {
    mock.onDelete(`${baseURL}/1`).reply(...apiResponse);

    const expectedActions = [
      { type: DELETE_PROJECT_VACANCIES_REQUEST },
      ...expectedResponse
    ];

    const vacanciesGroup = {
      vacancies: [
        {
          id: 1
        }
      ]
    };

    store.dispatch(deleteProjectVacancies(vacanciesGroup));

    await waitForExpect(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  };

  it('creates DELETE_PROJECT_VACANCIES_SUCCESS when the get request completes successfully', async () => {
    await testDeleteProjectVacanciesAction([
      {
        type: DELETE_PROJECT_VACANCIES_SUCCESS,
        data: { message: 'Success!' }
      },
      {
        type: REMOVE_PROJECT_VACANCIES_ON_FOCUS
      }
    ]);
  });

  it('creates DELETE_PROJECT_VACANCIES_FAILURE when the GET request encounters an error', async () => {
    const error = 'Internal Server Error!';
    await testDeleteProjectVacanciesAction(
      [
        {
          type: DELETE_PROJECT_VACANCIES_FAILURE,
          error
        }
      ],
      [500, { message: error }]
    );
  });
});
