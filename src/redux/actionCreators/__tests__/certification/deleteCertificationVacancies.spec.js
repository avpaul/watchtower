import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { deleteCertificationVacancies } from '../../certificationVacancyAction';
import initialState from '../../../reducers/initialState';

import {
  DELETE_CERTIFICATION_VACANCIES_REQUEST,
  DELETE_CERTIFICATION_VACANCIES_SUCCESS,
  DELETE_CERTIFICATION_VACANCIES_FAILURE
} from '../../../constants/certificationVacanciesTypes';

describe('Delete certification vacancies action', () => {
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
   * Test the deleteCertificationVacancies action according to the api response and the expected deleteCertificationVacancies data
   * @param object Expected action data
   * @param array Mock API response
   */
  const testDeleteCertificationVacanciesAction = (
    expectedResponse,
    apiResponse = [
      200,
      { message: 'You have successfully deleted the certification vacancies!' }
    ]
  ) => {
    mock.onDelete(baseURL).reply(...apiResponse);

    const expectedActions = [
      { type: DELETE_CERTIFICATION_VACANCIES_REQUEST },
      expectedResponse
    ];

    store
      .dispatch(
        deleteCertificationVacancies({
          certification: {},
          vacancy_details: {}
        })
      )
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toMatchObject(expectedActions);
      });
  };

  it('deletes CREATE_CERTIFICATION_VACANCY_REQUEST when the post request completes successfully', () => {
    testDeleteCertificationVacanciesAction({
      type: DELETE_CERTIFICATION_VACANCIES_SUCCESS,
      data: {}
    });
  });

  it('deletes CREATE_CERTIFICATION_VACANCY_FAIL when the post request encounters an error', () => {
    testDeleteCertificationVacanciesAction(
      {
        type: DELETE_CERTIFICATION_VACANCIES_FAILURE,
        error: 'Certification vacancy does not exist'
      },
      [400, { message: 'Certification vacancy does not exist' }]
    );
  });
});
