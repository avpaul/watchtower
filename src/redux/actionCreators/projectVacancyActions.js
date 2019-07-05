import {
  genericAPIPostRequest,
  genericAPIPutRequest,
  genericAPIDeleteRequest,
  genericAPIGetRequest
} from './helpers';
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
    vacancies,
    (dispatch, response) =>
      dispatch({
        type: types.UPDATE_PROJECT_VACANCIES_ON_FOCUS,
        data: response.data.data
      })
  );

const getAllVacancies = () =>
  genericAPIGetRequest('cadre/vacancies', [
    types.GET_ALL_VACANCIES_REQUEST,
    types.GET_ALL_VACANCIES_SUCCESS,
    types.GET_ALL_VACANCIES_FAILURE
  ]);

/**
 * Sets the project vacancies on focus for editing or deleting.
 *
 * @param object vacancies The details of the project vacancies
 * @return object A redux action
 */
const setProjectVacanciesOnFocus = vacancies => ({
  type: types.SET_PROJECT_VACANCIES_ON_FOCUS,
  data: vacancies
});

/**
 * An action creator responsible for updating a set of vacancies
 * @param object vacancies The details of the vacancies to update
 * @return object An instance of a Promise
 */
const editProjectVacancies = vacancies =>
  genericAPIPutRequest(
    'projects/vacancies/-',
    [
      types.EDIT_PROJECT_VACANCIES_REQUEST,
      types.EDIT_PROJECT_VACANCIES_SUCCESS,
      types.EDIT_PROJECT_VACANCIES_FAILURE
    ],
    vacancies,
    (dispatch, response) =>
      dispatch({
        type: types.UPDATE_PROJECT_VACANCIES_ON_FOCUS,
        data: response.data.data
      })
  );

/**
 * An action creator responsible for deleting a set of vacancies
 * @param object vacancyGroup The group of vacancies to be deleted
 * @return object An instance of a Promise
 */
const deleteProjectVacancies = vacanciesGroup =>
  genericAPIDeleteRequest(
    `projects/vacancies/${vacanciesGroup.vacancies[0].id}`,
    [
      types.DELETE_PROJECT_VACANCIES_REQUEST,
      types.DELETE_PROJECT_VACANCIES_SUCCESS,
      types.DELETE_PROJECT_VACANCIES_FAILURE
    ],
    dispatch =>
      dispatch({
        type: types.REMOVE_PROJECT_VACANCIES_ON_FOCUS,
        data: vacanciesGroup
      })
  );

export {
  createNewProjectVacancies as default,
  editProjectVacancies,
  deleteProjectVacancies,
  getAllVacancies,
  setProjectVacanciesOnFocus
};
