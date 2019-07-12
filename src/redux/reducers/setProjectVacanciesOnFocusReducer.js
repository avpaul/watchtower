import initialState from './initialState';
import { SET_PROJECT_VACANCIES_ON_FOCUS } from '../constants/projectsTypes';

export default (state = initialState.projectVacanciesOnFocus, action) => {
  switch (action.type) {
    case SET_PROJECT_VACANCIES_ON_FOCUS: {
      return action.data;
    }
    default:
      return state;
  }
};
