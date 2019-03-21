import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  LOAD_ENGINEERING_MANAGER_TTLS_FAILURE,
  LOAD_ENGINEERING_MANAGER_TTLS_REQUEST,
  LOAD_ENGINEERING_MANAGER_TTLS_SUCCESS
} from '../../constants/engineeringManagerTypes';
import getEngineeringManagerTtls from '../getEngineeringManagerTtls';

describe("fetch engineering manager 's data actions", () => {
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v1/engineeringmanagers/ttls?email=ai.ls@andela.com`;
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore({
    loading: false,
    data: [],
    error: null
  });
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it(`dispatches LOAD_ENGINEERING_MANAGER_TTLS_REQUEST and LOAD_ENGINEERING_MANAGER_TTLS_SUCCESS 
      on successful fetch of engineering manager's data`, () => {
    const data = {
      ttl: [
        {
          firstName: 'trust',
          lastName: 'birungi',
          email: 'trustbirungi@andela.com'
        },
        {
          firstName: 'augustine',
          lastName: 'ezinwa',
          email: 'augustine.ezinwa@andela.com'
        }
      ],
      averageFellowsPerTtl: 0
    };
    mock.onGet(`${baseURL}`).reply(200, { ...data });
    const expectedActions = [
      { type: LOAD_ENGINEERING_MANAGER_TTLS_REQUEST },
      {
        type: LOAD_ENGINEERING_MANAGER_TTLS_SUCCESS,
        data
      }
    ];
    return store
      .dispatch(getEngineeringManagerTtls('ai.ls@andela.com'))
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
  });

  it(`dispatches LOAD_ENGINEERING_MANAGER_TTLS_REQUEST and LOAD_ENGINEERING_MANAGER_TTLS_FAILURE
  on failure to fetch engineering manager's data`, () => {
    const expectedActions = [
      { type: LOAD_ENGINEERING_MANAGER_TTLS_REQUEST },
      {
        type: LOAD_ENGINEERING_MANAGER_TTLS_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];
    return store
      .dispatch(getEngineeringManagerTtls('fake@mail.com'))
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
  });
});
