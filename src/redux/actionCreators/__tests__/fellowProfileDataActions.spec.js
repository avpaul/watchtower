import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  LOAD_FELLOW_PROFILE_DATA_REQUEST,
  LOAD_FELLOW_PROFILE_DATA_FAILURE,
  LOAD_FELLOW_PROFILE_DATA_SUCCESS
} from '../../constants/fellowProfileDataTypes';
import getFellowProfileData from '../fellowProfileDataActions';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

describe('Manager Fellow Actions', () => {
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const url = `${serverURL}/api/v2/fellows/profile`;
  const store = mockStore({
    loading: false,
    fellow: {},
    error: null
  });
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it('dispatches LOAD_FELLOW_PROFILE_DATA_REQUEST and  LOAD_FELLOW_PROFILE_DATA_ERROR on failing to fetch fellow', () => {
    const expectedActions = [
      { type: LOAD_FELLOW_PROFILE_DATA_REQUEST },
      {
        type: LOAD_FELLOW_PROFILE_DATA_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];
    return store.dispatch(getFellowProfileData()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
  it('dispatches LOAD_FELLOW_PROFILE_DATA_REQUEST and  LOAD_FELLOW_PROFILE_DATA_SUCCESS on failing to fetch fellow', () => {
    const data = {
      fellow: {}
    };

    mock.onGet(`${url}`).reply(200, data.fellow);

    const expectedActions = [
      { type: LOAD_FELLOW_PROFILE_DATA_REQUEST },
      {
        type: LOAD_FELLOW_PROFILE_DATA_SUCCESS,
        ...data
      }
    ];
    return store.dispatch(getFellowProfileData()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
});
