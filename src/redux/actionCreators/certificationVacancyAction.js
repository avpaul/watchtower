import { genericAPIPostRequest } from './helpers';
import * as types from '../constants/certificationVacanciesTypes';

/**
 * An action creator responsible for creating a new set of vacancies
 * @param object vacancies The details of the new vacancies
 * @return object An instance of a Promise
 */
const createNewCertificationVacancy = vacancies =>
  genericAPIPostRequest(
    'certification/vacancies',
    [
      types.CREATE_CERTIFICATION_VACANCY_REQUEST,
      types.CREATE_CERTIFICATION_VACANCY_SUCCESS,
      types.CREATE_CERTIFICATION_VACANCY_FAIL
    ],
    vacancies
  );

export { createNewCertificationVacancy as default };
