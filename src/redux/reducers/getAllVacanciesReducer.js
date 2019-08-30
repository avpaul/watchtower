import initialState from './initialState';
import * as types from '../constants/projectsTypes';
import * as certificationTypes from '../constants/certificationVacanciesTypes';
import genericReducer from './genericReducer';

/**
 * Removes a vacancy from the list of vacancies
 *
 * @param array vacancies List of project vacancies
 * @param object vacancy Details of project vacancies group to remove
 * @return array Updated list of project vacancies
 */
const removeProjectVacancy = (vacancies, vacancy) =>
  vacancies.filter(
    vacancyGroup =>
      !(
        (vacancyGroup.project.id === vacancy.old_project_id ||
          vacancyGroup.project.id === vacancy.project.id) &&
        (vacancyGroup.role.id === vacancy.old_project_role_id ||
          vacancyGroup.role.id === vacancy.role.id)
      )
  );

const removeCertificationVacancy = (vacancies, vacancy) =>
  vacancies.filter(
    vacancyGroup =>
      vacancyGroup.certification.id !== vacancy.certification.id &&
      vacancyGroup.vacancy_details.cycle_id !== vacancy.vacancy_details.cycle_id
  );

export default (state = initialState.getAllVacancies, action) => {
  switch (action.type) {
    case types.GET_ALL_VACANCIES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.GET_ALL_VACANCIES_SUCCESS:
      return {
        error: null,
        loading: false,
        data: action.data
      };
    case types.GET_ALL_VACANCIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case types.REMOVE_PROJECT_VACANCIES_ON_FOCUS:
      return {
        ...state,
        data: {
          ...state.data,
          projectVacancies: removeProjectVacancy(
            state.data.projectVacancies,
            action.data
          )
        }
      };
    case certificationTypes.REMOVE_CERTIFICATION_VACANCIES_ON_FOCUS:
      return {
        ...state,
        data: {
          ...state.data,
          certificationVacancies: removeCertificationVacancy(
            state.data.certificationVacancies,
            action.data
          )
        }
      };
    case types.UPDATE_PROJECT_VACANCIES_ON_FOCUS:
      return {
        ...state,
        data: {
          ...state.data,
          projectVacancies: [action.data].concat(
            removeProjectVacancy(state.data.projectVacancies, action.data)
          )
        }
      };
    case certificationTypes.UPDATE_CERTIFICATION_VACANCY_ON_FOCUS:
      return {
        ...state,
        data: {
          ...state.data,
          certificationVacancies: [action.data].concat(
            removeCertificationVacancy(
              state.data.certificationVacancies,
              action.data
            )
          )
        }
      };
    default:
      return state;
  }
};

/**
 * Store all retrieved vacancies that do not have cycle id
 *
 * @param { object } state the initial state of the reducer
 * @param { object } action the action object dispatched
 * @return { array } A set of all the vacancies fetched
 */
export const fetchVacanciesWithNotCycleIdReducer = (
  state = initialState.cadreVacanciesWithNoCycleId,
  action
) =>
  genericReducer(
    [
      types.GET_ALL_VACANCIES_WITH_NO_CYCLEID_REQUEST,
      types.GET_ALL_VACANCIES_WITH_NO_CYCLEID_SUCCESS,
      types.GET_ALL_VACANCIES_WITH_NO_CYCLEID_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );
