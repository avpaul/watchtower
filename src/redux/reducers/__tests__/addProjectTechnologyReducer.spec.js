import addProjectTechnologyReducer from '../addProjectTechnologyReducer';
import { ADD_PROJECT_TECHNOLOGY } from '../../constants/projectsTypes';
import initialState from '../initialState';

it('should return the initial state for unknown action type', () => {
  expect(addProjectTechnologyReducer(undefined, {})).toEqual(
    initialState.addProjectTechnology
  );
});

it('should successfully update the addProjectTechnology state', () => {
  const action = { type: ADD_PROJECT_TECHNOLOGY, data: 'laravel' };

  expect(
    addProjectTechnologyReducer(initialState.addProjectTechnology, action)
  ).toMatchObject({
    ...initialState.addProjectTechnology,
    technology: 'laravel'
  });
});
