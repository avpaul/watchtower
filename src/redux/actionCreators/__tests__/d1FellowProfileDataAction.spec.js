import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  LOAD_D1_FELLOW_PROFILE_DATA_REQUEST,
  LOAD_D1_FELLOW_PROFILE_DATA_SUCCESS,
  LOAD_D1_FELLOW_PROFILE_DATA_FAILURE
} from '../../constants/d1FellowProfileDataTypes';
import getD1FellowProfileData from '../d1FellowProfileDataAction';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

describe('Manager Fellow Actions', () => {
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const url = `${serverURL}/api/v2/fellows/profile/cadre`;
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

  it('dispatches LOAD_D1_FELLOW_PROFILE_DATA_REQUEST and  LOAD_D1_FELLOW_PROFILE_DATA_ERROR on failing to fetch D1 fellow profile', () => {
    const expectedActions = [
      { type: LOAD_D1_FELLOW_PROFILE_DATA_REQUEST },
      {
        type: LOAD_D1_FELLOW_PROFILE_DATA_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];
    return store.dispatch(getD1FellowProfileData()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
  it('dispatches LOAD_D1_FELLOW_PROFILE_DATA_REQUEST and  LOAD_D1_FELLOW_PROFILE_DATA_SUCCESS on retriving D1 fellow profile', () => {
    const fellow = {};

    mock.onGet(`${url}`).reply(200, fellow);

    const expectedActions = [
      { type: LOAD_D1_FELLOW_PROFILE_DATA_REQUEST },
      {
        type: LOAD_D1_FELLOW_PROFILE_DATA_SUCCESS,
        ...fellow
      }
    ];
    return store.dispatch(getD1FellowProfileData()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
});
