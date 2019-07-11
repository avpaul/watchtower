import { genericAPIPostRequest, genericAPIGetRequest } from './helpers';
import * as types from '../constants/projectsTypes';

/**
 * An action creator responsible for creating a new set of vacancies
 * @param object vacancies The details of the new vacancies
 * @return object An instance of a Promise
 */
export const createNewProjectVacancies = vacancies =>
  genericAPIPostRequest(
    'projects/vacancies',
    [
      types.CREATE_PROJECT_VACANCIES_REQUEST,
      types.CREATE_PROJECT_VACANCIES_SUCCESS,
      types.CREATE_PROJECT_VACANCIES_FAILURE
    ],
    vacancies
  );

export const getAllVacancies = () =>
  genericAPIGetRequest('cadre/vacancies', [
    types.GET_ALL_VACANCIES_REQUEST,
    types.GET_ALL_VACANCIES_SUCCESSS,
    types.GET_ALL_VACANCIES_FAILURE
  ]);
