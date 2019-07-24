import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import createNewCertificationVacancy from '../../certificationVacancyAction';
import initialState from '../../../reducers/initialState';

import {
  CREATE_CERTIFICATION_VACANCY_REQUEST,
  CREATE_CERTIFICATION_VACANCY_SUCCESS,
  CREATE_CERTIFICATION_VACANCY_FAIL
} from '../../../constants/certificationVacanciesTypes';

describe('Create certification vacancies action', () => {
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/certification/vacancies`;

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  /**
   * Test the createCertificationVacancies action according to the api response and the expected createCertificationVacancies data
   * @param object Expected action data
   * @param array Mock API response
   */
  const testCreateCertificationVacanciesAction = (
    expectedResponse,
    apiResponse = [
      201,
      { message: 'You have successfully created certification vacancies!' }
    ]
  ) => {
    mock.onPost(baseURL).reply(...apiResponse);

    const expectedActions = [
      { type: CREATE_CERTIFICATION_VACANCY_REQUEST },
      expectedResponse
    ];

    store.dispatch(createNewCertificationVacancy({})).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  };

  it('creates CREATE_CERTIFICATION_VACANCY_REQUEST when the post request completes successfully', () => {
    testCreateCertificationVacanciesAction({
      type: CREATE_CERTIFICATION_VACANCY_SUCCESS,
      data: {}
    });
  });

  it('creates CREATE_CERTIFICATION_VACANCY_FAIL when the post request encounters an error', () => {
    testCreateCertificationVacanciesAction(
      {
        type: CREATE_CERTIFICATION_VACANCY_FAIL,
        error: 'certification does not exists!'
      },
      [400, { message: 'certification does not exists!' }]
    );
  });
});
