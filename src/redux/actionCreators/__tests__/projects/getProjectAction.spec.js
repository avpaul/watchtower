import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import * as types from '../../../constants/projectsTypes';
import {
  fetchAllProjects,
  getAProject,
  editProject,
  createNewProject
} from '../../projectsActions';

describe('Fetch all projects action', () => {
  const initialState = {
    createProject: {
      loading: false,
      data: {},
      error: ''
    }
  };

  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/projects`;

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  /**
   * Test the fetch all projects action according to the api response
   *
   * @param object Expected action data
   * @param array Mock API response
   */
  const testFetchAllProjectsAction = (
    expectedResponse,
    apiResponse = [200, { message: 'Success!' }]
  ) => {
    mock.onGet(baseURL).reply(...apiResponse);

    const expectedActions = [
      { type: types.FETCH_PROJECTS_REQUEST },
      expectedResponse
    ];

    store.dispatch(fetchAllProjects()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  };

  /**
   * Test the getAProject action according to the api response
   *
   * @param object Expected action data
   * @param array Mock API response
   */
  const testGetAProjectAction = (
    projectId,
    expectedResponse,
    apiResponse = [200, { data: {}, message: 'Success!' }]
  ) => {
    mock.onGet(`${baseURL}/${projectId}`).reply(...apiResponse);

    const expectedActions = [
      { type: types.GET_SINGLE_PROJECT_REQUEST },
      expectedResponse
    ];

    store.dispatch(getAProject(projectId)).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  };

  /**
   * Test the editProject action according to the api response
   *
   * @param object Expected action data
   * @param array Mock API response
   */
  const testEditAProject = (
    projectData,
    expectedResponse,
    apiResponse = [200, { data: {}, message: 'Success!' }]
  ) => {
    mock.onPut(`${baseURL}/${projectData.id}`).reply(...apiResponse);

    const expectedActions = [
      { type: types.EDIT_PROJECT_REQUEST },
      expectedResponse
    ];

    store.dispatch(editProject(projectData)).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  };

  /**
   * Test the createProject action according to the api response
   *
   * @param object Expected action data
   * @param array Mock API response
   */
  const testCreateProject = (
    projectData,
    expectedResponse,
    apiResponse = [200, { data: {}, message: 'Success!' }]
  ) => {
    mock.onPost(baseURL).reply(...apiResponse);

    const expectedActions = [
      { type: types.CREATE_PROJECT_REQUEST },
      expectedResponse
    ];

    store.dispatch(createNewProject(projectData)).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  };

  it('creates FETCH_PROJECTS_SUCCESS when the get request completes successfully', () => {
    testFetchAllProjectsAction({
      type: types.FETCH_PROJECTS_SUCCESS,
      data: {}
    });
  });

  it('creates FETCH_PROJECTS_FAILURE when the GET request encounters an error', () => {
    testFetchAllProjectsAction(
      {
        type: types.FETCH_PROJECTS_FAILURE,
        error: 'Internal Server Error!'
      },
      [500, { message: 'Internal Server Error!' }]
    );
  });

  it('gets a single project on GET_SINGLE_PROJECT_SUCCESS', () => {
    testGetAProjectAction(1, {
      data: {},
      type: types.GET_SINGLE_PROJECT_SUCCESS
    });
  });

  it('gets a single project on GET_SINGLE_PROJECT_SUCCESS', () => {
    testGetAProjectAction(
      'someInvalidEntry',
      {
        type: types.GET_SINGLE_PROJECT_FAILURE,
        error: 'Internal Server Error'
      },
      [500, { message: 'Internal Server Error' }]
    );
  });

  it('edit a single project on EDIT_PROJECT_SUCCESS', () => {
    const projectData = {
      id: 1,
      name: 'an edited name'
    };
    testEditAProject(projectData, {
      type: types.EDIT_PROJECT_SUCCESS,
      data: {}
    });
  });

  it('Create a single project on CREATE_PROJECT_SUCCESS', () => {
    const projectData = {
      id: 1,
      name: 'a new project name'
    };
    testCreateProject(projectData, {
      type: types.CREATE_PROJECT_SUCCESS,
      data: {}
    });
  });
});
