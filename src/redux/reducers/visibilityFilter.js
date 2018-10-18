import initialState from './initialState';
import { SET_VISIBILITY_FILTER } from '../constants/fellowActionTypes';

const visibilityFilter = (state = initialState.visibilityFilter, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
};

export default visibilityFilter;
