import initialState from './initialState';
import * as types from '../constants/cadreVacanciesTypes';

const addNewApplication = (vacancies, newApplication) => {
  const allVacancies = [...vacancies];
  let currentVacancy;
  if (newApplication.project_id) {
    currentVacancy = allVacancies.find(
      vacancy =>
        Number(vacancy.project.id) === Number(newApplication.project_id) &&
        Number(vacancy.vacancy.cycle_id) === Number(newApplication.cycle_id) &&
        Number(vacancy.role.id) === Number(newApplication.project_role_id)
    );

    currentVacancy.vacancy.hasApplied = true;
  } else {
    currentVacancy = allVacancies.find(
      vacancy =>
        Number(vacancy.certification.id) ===
          newApplication.project_certifications_id &&
        Number(vacancy.vacancy_details.cycle_id) ===
          Number(newApplication.cycle_id)
    );
    currentVacancy.vacancy_details.hasApplied = true;
  }
  return allVacancies;
};

const cadreVacanciesReducer = (state = initialState.cadreVacancies, action) => {
  switch (action.type) {
    case types.FETCH_CADREVACANCIES_REQUEST:
    case types.CERTIFICATION_APPLICATION_REQUEST:
    case types.ROLE_APPLICATION_REQUEST:
      return {
        ...state,
        loading: true
      };

    case types.FETCH_CADREVACANCIES_SUCCESS:
      return {
        error: null,
        loading: false,
        data: action.data
      };

    case types.FETCH_CADREVACANCIES_FAILURE:
    case types.CERTIFICATION_APPLICATION_FAILURE:
    case types.ROLE_APPLICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case types.CERTIFICATION_APPLICATION_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          certificationVacancies: addNewApplication(
            state.data.certificationVacancies,
            action.data
          )
        },
        loading: false
      };
    case types.ROLE_APPLICATION_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          projectVacancies: addNewApplication(
            state.data.projectVacancies,
            action.data.application
          ),
          newApplication: `${action.data.application.project_role_id}-${action.data.application.project_id}`
        },

        loading: false
      };

    default:
      return state;
  }
};

export default cadreVacanciesReducer;
