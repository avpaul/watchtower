import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  LOAD_MANAGER_FELLOWS_SUMMARY_REQUEST,
  LOAD_MANAGER_FELLOWS_SUMMARY_SUCCESS,
  LOAD_MANAGER_FELLOWS_SUMMARY_FAILURE
} from '../../constants/ManagerFellowsSummaryTypes';
import getManagerFellowsSummary, {
  resolveUrlByRole
} from '../managerFellowsSummaryActions';

describe("fetch manager 's data actions", () => {
  const serverUrl = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverUrl}/api/v2/managers/fellows/summary`;
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

  it(`dispatches LOAD_MANAGER_FELLOWS_SUMMARY_REQUEST and LOAD_MANAGER_FELLOWS_SUMMARY_SUCCESS 
      on successful fetch of developers summary data`, () => {
    const data = {
      details: [
        {
          firstName: 'Kingsley',
          lastName: 'Obot',
          project: 'Watch Tower',
          level: 'D0B',
          status: 'onTrack',
          picture:
            'https://lh6.googleusercontent.com/-BufLjmmIcGY/AAAAAAAAAAI/AAAAAAAAAAA/ACevoQOvARh88U8Y-5JFnZpZ88zfTlb93A/mo/photo.jpg?sz=50',
          apprenticeship_start_date: '2018-10-15',
          apprenticeship_end_date: '2019-01-16',
          simulations_start_date: null,
          simulations_end_date: null,
          devPulseAverage: '1.04',
          lmsOutput: '4/18'
        }
      ]
    };
    mock.onGet(`${baseURL}`).reply(200, { ...data });
    const expectedActions = [
      { type: LOAD_MANAGER_FELLOWS_SUMMARY_REQUEST },
      {
        type: LOAD_MANAGER_FELLOWS_SUMMARY_SUCCESS,
        managerFellowsSummary: data
      }
    ];
    return store
      .dispatch(
        getManagerFellowsSummary(
          { WATCH_TOWER_TTL: '43434343fdfr-' },
          'trust.birungi@andela.com'
        )
      )
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
  });

  it(`dispatches LOAD_MANAGER_FELLOWS_SUMMARY_REQUEST and LOAD_MANAGER_FELLOWS_SUMMARY_FAILURE
  on failure to fetch developers summary data`, () => {
    const expectedActions = [
      { type: LOAD_MANAGER_FELLOWS_SUMMARY_REQUEST },
      {
        type: LOAD_MANAGER_FELLOWS_SUMMARY_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];
    return store
      .dispatch(getManagerFellowsSummary('WATCH_TOWER_TTL', 'test@gfy.com'))
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
  });

  it('should resolve url if resolve function is called', () => {
    const deduceRole = role => {
      const roleObject = {
        [`${role}`]: '34343'
      };
      return roleObject;
    };
    expect(resolveUrlByRole(deduceRole('WATCH_TOWER_EM'), 'mock.com')).toBe(
      'mock.com'
    );

    expect(resolveUrlByRole(deduceRole('WATCH_TOWER_TTL'))).toEqual(
      expect.stringContaining('api/v2/managers/fellows/summary')
    );

    expect(resolveUrlByRole(deduceRole('WATCH_TOWER_SL'))).toEqual(
      expect.stringContaining('api/v2/managers/detail')
    );

    expect(resolveUrlByRole(deduceRole('WATCH_TOWER_EM'))).toEqual(
      expect.stringContaining('api/v2/managers/detail')
    );

    expect(resolveUrlByRole(deduceRole('WATCH_TOWER_LF'))).toEqual(
      expect.stringContaining('api/v2/managers/fellows/summary')
    );
  });
});
