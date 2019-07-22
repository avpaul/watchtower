import createCertificationVacanciesReducer from '../createCertificationVacanciesReducer';
import {
  CREATE_CERTIFICATION_VACANCY_REQUEST,
  CREATE_CERTIFICATION_VACANCY_SUCCESS,
  CREATE_CERTIFICATION_VACANCY_FAIL
} from '../../constants/certificationVacanciesTypes';
import initialState from '../initialState';

it('should set loading state on posting a new project', () => {
  const action = { type: CREATE_CERTIFICATION_VACANCY_REQUEST };
  expect(createCertificationVacanciesReducer(undefined, action)).toMatchObject({
    ...initialState.createCertificationVacanciesReducer,
    loading: true
  });
});

it('should execute the success action type case on successful post', () => {
  const action = {
    type: CREATE_CERTIFICATION_VACANCY_SUCCESS,
    data: {}
  };

  const newState = {
    ...initialState.createProjectVacancies,
    data: action.data
  };

  expect(createCertificationVacanciesReducer(undefined, action)).toMatchObject(
    newState
  );
});

it('should execute the failure action type case on failed post', () => {
  const action = {
    type: CREATE_CERTIFICATION_VACANCY_FAIL,
    error: { message: 'error' }
  };

  const newState = {
    ...initialState.createCertificationVacanciesReducer,
    error: action.error
  };

  expect(createCertificationVacanciesReducer(undefined, action)).toMatchObject(
    newState
  );
});
