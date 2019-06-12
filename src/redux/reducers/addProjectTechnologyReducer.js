import initialState from './initialState';
import { ADD_PROJECT_TECHNOLOGY } from '../constants/projectsTypes';

export default (state = initialState.addProjectTechnology, action) => {
  switch (action.type) {
    case ADD_PROJECT_TECHNOLOGY: {
      return { technology: action.data };
    }
    default:
      return state;
  }
};
