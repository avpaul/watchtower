import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { deleteProject, setDeleteTarget } from '../../projectsActions';

import * as types from '../../../constants/projectsTypes';

describe('Fetch all roles action', () => {
  const initialState = {
    allProjects: {
      deleteTargetId: 1
    }
  };

  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/projects`;

  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });

  afterEach(() => {
    mock.reset();
    moxios.uninstall();
  });

  it('creates DELETE_PROJECT when the DELETE project request completes successfully', async done => {
    moxios.stubRequest(`${baseURL}/1`, {
      status: 204,
      response: {}
    });

    const expectedActions = [
      {
        type: types.DELETE_PROJECT_SUCCESS,
        deletedProjectId: 1
      }
    ];

    await store.dispatch(deleteProject()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('creates DELETE_PROJECT_FAILURE when the DELETE project request fails', async done => {
    moxios.stubRequest(`${baseURL}/1`, {
      status: 404,
      response: {
        message: 'something went wrong'
      }
    });

    const expectedActions = [
      {
        type: types.DELETE_PROJECT_FAILURE,
        error: 'something went wrong'
      }
    ];

    await store.dispatch(deleteProject()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should set delete target correctly',  () => {
    const expectedActions = [
      {
        type: "SET_PROJECT_DELETE_TARGET",
        data: 1, 
      }
    ];
    
    const project = {
      'id' : 1
    };

    store.dispatch(setDeleteTarget(project));

    store.dispatch(deleteProject()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

  });
});
