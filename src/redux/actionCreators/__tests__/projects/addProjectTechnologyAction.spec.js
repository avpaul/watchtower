import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { addProjectTechnology } from '../../projectTechnologiesActions';
import { ADD_PROJECT_TECHNOLOGY } from '../../../constants/projectsTypes';
import initialState from '../../../reducers/initialState';

describe('Add new project technology action', () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore(initialState);

  it('creates ADD_PROJECT_TECHNOLOGY when the action creator is called', () => {
    const expectedActions = [{ type: ADD_PROJECT_TECHNOLOGY }];
    store.dispatch(addProjectTechnology({}));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toMatchObject(expectedActions);
  });
});
