import initialState from './initialState';
import { ADD_PROJECT_MANAGER } from '../constants/projectsTypes';

export default (state = initialState.addProjectManager, action) => {
  switch (action.type) {
    case ADD_PROJECT_MANAGER: {
      return { manager: action.manager };
    }
    default:
      return state;
  }
};
