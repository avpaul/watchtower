import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  LOAD_EM_SIMSLEADS_FAILURE,
  LOAD_EM_SIMSLEADS_REQUEST,
  LOAD_EM_SIMSLEADS_SUCCESS
} from '../../constants/emsSimsLeadsTypes';
import getEmsSimsLeadsActions from '../getEmsSimsLeadsActions';

describe("fetch engineering manager 's data actions", () => {
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v2/managers/details`;
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

  it(`dispatches LOAD_EM_SIMSLEADS_REQUEST and LOAD_EM_SIMSLEADS_SUCCESS 
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
      { type: LOAD_EM_SIMSLEADS_REQUEST },
      {
        type: LOAD_EM_SIMSLEADS_SUCCESS,
        data
      }
    ];
    return store.dispatch(getEmsSimsLeadsActions()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });

  it(`dispatches LOAD_EM_SIMSLEADS_REQUEST and LOAD_EM_SIMSLEADS_FAILURE
  on failure to fetch engineering manager's data`, () => {
    const expectedActions = [
      { type: LOAD_EM_SIMSLEADS_REQUEST },
      {
        type: LOAD_EM_SIMSLEADS_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];
    return store.dispatch(getEmsSimsLeadsActions()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
});
