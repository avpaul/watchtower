import initialState from './initialState';
import * as types from '../constants/cadreVacanciesTypes';

const addNewApplication = (vacancies, newApplication) => {
  const certificationVacancies = [...vacancies];
  const currentVacancy = certificationVacancies.find(
    vacancy =>
      vacancy.certification.id === newApplication.project_certifications_id &&
      vacancy.vacancy_details.cycle_id === newApplication.cycle_id
  );

  currentVacancy.vacancy_details.applications.push(newApplication);
  return certificationVacancies;
};

const cadreVacanciesReducer = (state = initialState.cadreVacancies, action) => {
  switch (action.type) {
    case types.FETCH_CADREVACANCIES_REQUEST:
    case types.CERTIFICATION_APPLICATION_REQUEST:
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

    default:
      return state;
  }
};

export default cadreVacanciesReducer;
