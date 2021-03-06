import {
  genericAPIPostRequest,
  genericAPIPutRequest,
  genericAPIDeleteRequest,
  genericAPIGetRequest
} from './helpers';
import * as types from '../constants/projectsTypes';

const getAllVacancies = () =>
  genericAPIGetRequest('cadre/vacancies', [
    types.GET_ALL_VACANCIES_REQUEST,
    types.GET_ALL_VACANCIES_SUCCESS,
    types.GET_ALL_VACANCIES_FAILURE
  ]);

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
 * @param Integer cycleId of the current vacancy
 * @return object An instance of a Promise
 */
const editProjectVacancies = (vacancies, cycleId) =>
  genericAPIPutRequest(
    'projects/vacancies/-',
    [
      types.EDIT_PROJECT_VACANCIES_REQUEST,
      types.EDIT_PROJECT_VACANCIES_SUCCESS,
      types.EDIT_PROJECT_VACANCIES_FAILURE
    ],
    { ...vacancies, cycle_id: cycleId },
    (dispatch, response) =>
      dispatch({
        type: types.UPDATE_PROJECT_VACANCIES_ON_FOCUS,
        data: {
          ...response.data.data,
          old_project_id: vacancies.old_project_id,
          old_project_role_id: vacancies.old_project_role_id
        }
      })
  );

/**
 * An action creator responsible for deleting a set of vacancies
 * @param object vacancyGroup The group of vacancies to be deleted
 * @return object An instance of a Promise
 */
const deleteProjectVacancies = vacanciesGroup =>
  genericAPIDeleteRequest(
    `projects/vacancies/${vacanciesGroup.vacancy.project_id}`,
    [
      types.DELETE_PROJECT_VACANCIES_REQUEST,
      types.DELETE_PROJECT_VACANCIES_SUCCESS,
      types.DELETE_PROJECT_VACANCIES_FAILURE
    ],
    {
      project_role_id: vacanciesGroup.vacancy.project_role_id,
      cycle_id: vacanciesGroup.vacancy.cycle_id
    },
    dispatch =>
      dispatch({
        type: types.REMOVE_PROJECT_VACANCIES_ON_FOCUS,
        data: {
          ...vacanciesGroup,
          old_project_id: vacanciesGroup.project.id,
          old_project_role_id: vacanciesGroup.role.id
        }
      })
  );

/**
 * An action creator responsible for fetching all old vacancies
 * i.e. the vacancies that were created before the addition of cycle_id
 * to the vacancies table. this is necessary so that the OPS can see the
 * vacancies they created before the introduction of cycles
 * @return object An instance of a Promise
 */
const getAllVacanciesWithNoCycleId = () =>
  genericAPIGetRequest('projects/vacancies/old', [
    types.GET_ALL_VACANCIES_WITH_NO_CYCLEID_REQUEST,
    types.GET_ALL_VACANCIES_WITH_NO_CYCLEID_SUCCESS,
    types.GET_ALL_VACANCIES_WITH_NO_CYCLEID_FAILURE
  ]);

export {
  createNewProjectVacancies as default,
  editProjectVacancies,
  deleteProjectVacancies,
  getAllVacancies,
  setProjectVacanciesOnFocus,
  getAllVacanciesWithNoCycleId
};
