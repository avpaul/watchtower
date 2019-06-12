import addProjectManagerReducer from '../addProjectManagerReducer';
import { ADD_PROJECT_MANAGER } from '../../constants/projectsTypes';
import initialState from '../initialState';

it('should return the initial state for unknown action type', () => {
  expect(addProjectManagerReducer(undefined, {})).toEqual(
    initialState.addProjectManager
  );
});

it('should successfully update the addProjectManager state', () => {
  const manager = { name: 'john doe' };
  const action = { type: ADD_PROJECT_MANAGER, manager };

  expect(
    addProjectManagerReducer(initialState.addProjectManager, action)
  ).toMatchObject({
    ...initialState.addProjectManager,
    manager
  });
});
