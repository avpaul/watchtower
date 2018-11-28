import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import getTtlProjectsData from '../ttlProjectsActions';
import {
  TTL_PROJECTS_REQUEST,
  TTL_PROJECTS_SUCCESS,
  TTL_PROJECTS_FAILURE
} from '../../constants/ttlTypes';

describe('TTLS Project Actions', () => {
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const name = 'Trust Birungi';
  const baseURL = `${serverURL}/api/v1/ttls/projects?name=${name}`;
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore({
    loading: false,
    projects: [],
    error: null
  });
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it('dispatches TTL_PROJECTS_REQUEST and TTL_PROJECTS_SUCCESS on successfully fetching projects', () => {
    const projects = {
      projects: {
        data: {
          totalFellows: 4,
          projects: {
            Watchtower: 2,
            Activo: 1,
            Converge: 1
          }
        }
      }
    };
    mock.onGet(`${baseURL}`).reply(200, { ...projects });
    const expectedActions = [
      { type: TTL_PROJECTS_REQUEST },
      {
        type: TTL_PROJECTS_SUCCESS,
        projects
      }
    ];
    return store.dispatch(getTtlProjectsData(name)).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  });

  it('dispatches TTL_PROJECTS_REQUEST and TTL_PROJECTS_FAILURE on failing to fetch fellows', () => {
    const expectedActions = [
      { type: TTL_PROJECTS_REQUEST },
      {
        type: TTL_PROJECTS_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];
    return store.dispatch(getTtlProjectsData('Trust Birungi')).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
});
