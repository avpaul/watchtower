import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import jsonwebtoken from 'jsonwebtoken';
import Cookie from 'js-cookie';
import {
  LOAD_FELLOW_PULSE_REQUEST,
  LOAD_FELLOW_PULSE_SUCCESS,
  LOAD_FELLOW_PULSE_FAILURE
} from '../../constants/fellowActionTypes';
import initialState from '../../reducers/initialState';
import getFellowDevPulse from '../fellowDevPulseActions';

describe('Fellow Actions', () => {
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const email = 'test.user@andela.com';
  const baseURL = `${serverURL}/api/v1/fellows/pulse?user=${email}`;
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore(initialState);

  beforeAll(() => {
    const user = {
      UserInfo: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test.user@andela.com',
        name: 'Test User'
      }
    };
    const token = jsonwebtoken.sign(user, 'shhhhh');
    Cookie.set = jest.fn(() => token);
    Cookie.set('jwt-token', token, { domain: '.andela.com' });
    Cookie.get = jest.fn(() => token);
    Cookie.remove = jest.fn();
  });

  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it('dispatches LOAD_FELLOW_PULSE_REQUEST and LOAD_FELLOW_PULSE_SUCCESS on successfully fetching fellow ratings', () => {
    const data = {
      data: {
        weeklyRatings: [],
        averageRatings: {
          communication: '1',
          integration: '1.1',
          quantity: '1.5',
          quality: '0.4',
          professionalism: '1.3',
          initiative: '1.7'
        }
      }
    };
    mock.onGet(baseURL).reply(200, { ...data });
    const expectedActions = [
      { type: LOAD_FELLOW_PULSE_REQUEST },
      {
        type: LOAD_FELLOW_PULSE_SUCCESS,
        averageRatings: {
          communication: '1',
          initiative: '1.7',
          integration: '1.1',
          professionalism: '1.3',
          quality: '0.4',
          quantity: '1.5'
        },
        ratings: []
      }
    ];
    return store.dispatch(getFellowDevPulse()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  });

  it('dispatches LOAD_FELLOW_PULSE_REQUEST and LOAD_FELLOW_PULSE_FAILURE on failing to fetch fellow raings', () => {
    const expectedActions = [
      { type: LOAD_FELLOW_PULSE_REQUEST },
      {
        type: LOAD_FELLOW_PULSE_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];
    return store.dispatch(getFellowDevPulse()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
});
