import visibilityFilter from './visibilityFilter';
import initialState from './initialState';
import { SET_VISIBILITY_FILTER } from '../constants/fellowActionTypes';
import { OFFTRACK_WK4_MINUS } from '../constants/fellowFilters';

it('should add visibility filter to state', () => {
  const action = {
    type: SET_VISIBILITY_FILTER,
    filter: OFFTRACK_WK4_MINUS,
  };

  expect(visibilityFilter(undefined, action)).toEqual(OFFTRACK_WK4_MINUS);
});

it('should return the initial state for unknown action type', () => {
  expect(visibilityFilter(undefined, {})).toEqual(initialState.visibilityFilter);
});
