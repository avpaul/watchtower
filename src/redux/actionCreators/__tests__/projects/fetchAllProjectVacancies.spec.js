import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import {
  getAllVacancies,
  getAllVacanciesWithNoCycleId
} from '../../projectVacancyActions';
import initialState from '../../../reducers/initialState';

import * as types from '../../../constants/projectsTypes';
import projectVacancies from '../../../../__mocks__/projectVacancy';

describe('Get all project vacancies action', () => {
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/cadre/vacancies`;
  const oldVacanciesEndpoint = `${serverURL}/api/v2/projects/vacancies/old`;

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
      { type: types.GET_ALL_VACANCIES_REQUEST },
      {
        type: types.GET_ALL_VACANCIES_FAILURE,
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
      { type: types.GET_ALL_VACANCIES_REQUEST },
      {
        type: types.GET_ALL_VACANCIES_SUCCESS,
        data: vacancies
      }
    ];
    return store.dispatch(getAllVacancies()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });

  /**
   * Test the getAllVacanciesWithNoCycleId action according to the api
   * response and the expected getAllVacanciesWithNoCycleId data
   * The action creator being tested here exists because there have been
   * some vacancies before we realized that cycles were not factored in
   *
   * @param object Expected action data
   * @param array Mock API response
   */

  it('dispatches GET_ALL_VACANCIES_WITH_NO_CYCLEID_REQUEST and  GET_ALL_VACANCIES_WITH_NO_CYCLEID_FAILURE on failing to fetch all vacancies with no cycleID', () => {
    const error = {
      message: 'The API is down'
    };

    mock.onGet(`${oldVacanciesEndpoint}`).reply(500, error);

    const expectedActions = [
      { type: types.GET_ALL_VACANCIES_WITH_NO_CYCLEID_REQUEST },
      {
        type: types.GET_ALL_VACANCIES_WITH_NO_CYCLEID_FAILURE,
        error: 'The API is down'
      }
    ];
    return store.dispatch(getAllVacanciesWithNoCycleId()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });

  it('dispatches GET_ALL_VACANCIES_WITH_NO_CYCLEID_REQUEST and  GET_ALL_VACANCIES_WITH_NO_CYCLEID_SUCCESS on fetching all vacancies with no cycleID', () => {
    const vacancies = {
      message: 'successfully retrieved old vacancies',
      data: projectVacancies.cadreVacanciesWithNoCycleId
    };

    mock.onGet(`${oldVacanciesEndpoint}`).reply(200, vacancies);

    const expectedActions = [
      { type: types.GET_ALL_VACANCIES_WITH_NO_CYCLEID_REQUEST },
      {
        type: types.GET_ALL_VACANCIES_WITH_NO_CYCLEID_SUCCESS,
        data: vacancies
      }
    ];
    return store.dispatch(getAllVacanciesWithNoCycleId()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
});
