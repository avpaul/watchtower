import { genericAPIPostRequest, genericAPIDeleteRequest } from './helpers';
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

/**
 * An action creator responsible for deleting a set of vacancies
 * @param object certificationVacancy The group of vacancies to be deleted
 * @return object An instance of a Promise
 */
export const deleteCertificationVacancies = vacanciesGroup =>
genericAPIDeleteRequest(
  `certification/vacancies/${vacanciesGroup.certification.id}`,
  [
    types.DELETE_CERTIFICATION_VACANCIES_REQUEST,
    types.DELETE_CERTIFICATION_VACANCIES_SUCCESS,
    types.DELETE_CERTIFICATION_VACANCIES_FAILURE
  ],
  {
    certification_id: vacanciesGroup.vacancy_details.certification_id,
    cycle_id: vacanciesGroup.vacancy_details.cycle_id
  },
  dispatch =>
    dispatch({
      type: types.REMOVE_CERTIFICATION_VACANCIES_ON_FOCUS,
      data: { ...vacanciesGroup }
    }),
);

export { createNewCertificationVacancy as default };
