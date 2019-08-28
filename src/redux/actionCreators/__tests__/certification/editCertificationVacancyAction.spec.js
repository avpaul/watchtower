import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
// import waitForExpect from 'wait-for-expect';
import { editCertificationVacancy } from '../../certificationVacancyAction';
import initialState from '../../../reducers/initialState';

import {
  EDIT_CERTIFICATION_VACANCY_SUCCESS,
  EDIT_CERTIFICATION_VACANCY_REQUEST,
  EDIT_CERTIFICATION_VACANCY_FAILURE
} from '../../../constants/certificationVacanciesTypes';

describe('Update certification vacancy action', () => {
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/certification/vacancies/-`;

  const defaultAPIResponse = {
    message: 'You have successfully updated some certification vacancies!',
    data: {
      certification: {},
      vacancy_details: {},
      available_slots: 0
    }
  };

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  const testUpdateCertificationVacancyAction = (
    expectedResponse,
    apiResponse = [200, defaultAPIResponse]
  ) => {
    mock.onPut(baseURL).reply(...apiResponse);

    const expectedActions = [
      { type: EDIT_CERTIFICATION_VACANCY_REQUEST },
      expectedResponse
    ];

    store
      .dispatch(
        editCertificationVacancy({
          certification: {},
          vacancy_details: {},
          available_slots: {}
        })
      )
      .then(() => {
        const dispatchedActions = store.getActions();
        expectedActions(dispatchedActions).toMatchObject(expectedActions);
      });
  };

  it('creates EDIT_CERTIFICATION_VACANCY_SUCCESS when the PUT request completes successfully', () => {
    testUpdateCertificationVacancyAction([
      {
        type: EDIT_CERTIFICATION_VACANCY_SUCCESS,
        data: defaultAPIResponse.data
      },
      {
        data: defaultAPIResponse.data,
        type: 'UPDATE_CERTIFICATION_VACANCY_ON_FOCUS'
      }
    ]);
  });

  it('creates EDIT_CERTIFICATION_VACANCY_FAILURE when the PUT request encounters an error', () => {
    const error = 'Invalid certification id!';
    testUpdateCertificationVacancyAction(
      [
        {
          type: EDIT_CERTIFICATION_VACANCY_FAILURE,
          error
        }
      ],
      [422, { message: error }]
    );
  });
});
