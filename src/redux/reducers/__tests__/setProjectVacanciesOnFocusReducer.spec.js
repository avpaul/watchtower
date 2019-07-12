import setProjectVacanciesOnFocusReducer from '../setProjectVacanciesOnFocusReducer';
import { SET_PROJECT_VACANCIES_ON_FOCUS } from '../../constants/projectsTypes';
import vacancyGroupMock from '../../../__mocks__/projectVacancy';
import initialState from '../initialState';

it('should return the initial state for unknown action type', () => {
  expect(setProjectVacanciesOnFocusReducer(undefined, {})).toEqual(
    initialState.projectVacanciesOnFocus
  );
});

it('should successfully update the projectVacanciesOnFocus state', () => {
  const action = {
    type: SET_PROJECT_VACANCIES_ON_FOCUS,
    data: vacancyGroupMock
  };

  expect(
    setProjectVacanciesOnFocusReducer(initialState.setProjectVacancies, action)
  ).toMatchObject(vacancyGroupMock);
});
