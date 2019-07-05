import initialState from './initialState';
import * as types from '../constants/projectsTypes';

/**
 * Removes a vacancy from the list of vacancies
 *
 * @param array vacancies List of project vacancies
 * @param object vacancy Details of project vacancies group to remove
 * @return array Updated list of project vacancies
 */
const removeVacancy = (vacancies, vacancy) =>
  vacancies.filter(
    vacancyGroup =>
      !(
        vacancyGroup.project.id === vacancy.project.id &&
        vacancyGroup.role.id === vacancy.role.id
      )
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
          projectVacancies: removeVacancy(
            state.data.projectVacancies,
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
            removeVacancy(state.data.projectVacancies, action.data)
          )
        }
      };
    default:
      return state;
  }
};
