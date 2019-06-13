import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { addProjectManager } from '../../projectManagerActions';
import { ADD_PROJECT_MANAGER } from '../../../constants/projectsTypes';
import initialState from '../../../reducers/initialState';

describe('Add project manager action', () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore(initialState);

  it('creates ADD_PROJECT_MANAGER when the action creator is called', () => {
    const expectedActions = [{ type: ADD_PROJECT_MANAGER }];

    store.dispatch(addProjectManager({}));
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toMatchObject(expectedActions);
  });
});
