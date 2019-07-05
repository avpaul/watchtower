import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { getAllVacancies } from '../../projectVacancyActions';
import initialState from '../../../reducers/initialState';

import {
  GET_ALL_VACANCIES_SUCCESS,
  GET_ALL_VACANCIES_REQUEST,
  GET_ALL_VACANCIES_FAILURE
} from '../../../constants/projectsTypes';

describe('Get all project vacancies action', () => {
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/cadre/vacancies`;

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  /**
   * Test the getAllVacancies action according to the api response and the expected getAllVacancies data
   * @param object Expected action data
   * @param array Mock API response
   */

  it('dispatches GET_ALL_VACANCIES_REQUEST and  GET_ALL_VACANCIES_FAILURE on failing to fetch all vacancies', () => {
    const expectedActions = [
      { type: GET_ALL_VACANCIES_REQUEST },
      {
        type: GET_ALL_VACANCIES_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];
    return store.dispatch(getAllVacancies()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
  it('dispatches GET_ALL_VACANCIES_REQUEST and  GET_ALL_VACANCIES_SUCCESS on to fetching all vacancies', () => {
    const vacancies = [];

    mock.onGet(`${baseURL}`).reply(200, vacancies);

    const expectedActions = [
      { type: GET_ALL_VACANCIES_REQUEST },
      {
        type: GET_ALL_VACANCIES_SUCCESS,
        data: vacancies
      }
    ];
    return store.dispatch(getAllVacancies()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
});
