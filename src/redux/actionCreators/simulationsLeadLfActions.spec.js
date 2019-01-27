import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  LOAD_SIMULATIONS_LEAD_LF_REQUEST,
  LOAD_SIMULATIONS_LEAD_LF_SUCCESS,
  LOAD_SIMULATIONS_LEAD_LF_FAILURE
} from '../constants/simulationsLeadTypes';
import getSimulationsLeadLfs from './simulationsLeadLfActions';

describe("fetch simulationsLead's data actions", () => {
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v1/simulationsLeads/lfs/?email=sims.lead@andela.com`;
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

  it(`dispatches LOAD_SIMULATIONS_LEAD_LF_REQUEST and LOAD_SIMULATIONS_LEAD_LF_SUCCESS 
      on successful fetch of simulationsLead's data`, () => {
    const data = {
      lfs: [
        {
          firstName: 'Martin',
          lastName: 'Bbaale',
          email: 'martin.bbaale@andela.com'
        }
      ],
      averageFellowsPerLf: 1
    };
    mock.onGet(`${baseURL}`).reply(200, { ...data });
    const expectedActions = [
      { type: LOAD_SIMULATIONS_LEAD_LF_REQUEST },
      {
        type: LOAD_SIMULATIONS_LEAD_LF_SUCCESS,
        data
      }
    ];
    return store
      .dispatch(getSimulationsLeadLfs('sims.lead@andela.com'))
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
  });

  it(`dispatches LOAD_SIMULATIONS_LEAD_LF_REQUEST and LOAD_SIMULATIONS_LEAD_LF_FAILURE
  on failure to fetch simulationsLead's data`, () => {
    const expectedActions = [
      { type: LOAD_SIMULATIONS_LEAD_LF_REQUEST },
      {
        type: LOAD_SIMULATIONS_LEAD_LF_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];
    return store
      .dispatch(getSimulationsLeadLfs('invalid.user@mail.com'))
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
  });
});
