import { genericAPIGetRequest } from './helpers';
import * as types from '../constants/cadreVacanciesTypes';

/**
 * An action creator responsible for fetching all vacancies
 * @return object An instance of a Promise
 */
export const fetchAllVacancies = () =>
  genericAPIGetRequest('cadre/vacancies', [
    types.FETCH_CADREVACANCIES_REQUEST,
    types.FETCH_CADREVACANCIES_SUCCESS,
    types.FETCH_CADREVACANCIES_FAILURE
  ]);

export default {
  fetchAllVacancies
};
