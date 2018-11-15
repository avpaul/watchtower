import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  LOAD_FELLOW_PROGRESS_REQUEST,
  LOAD_FELLOW_PROGRESS_SUCCESS
} from '../../constants/fellowProgressTypes';
import getFellowProgress from '../fellowProgressActions';

describe('Fellow Actions', () => {
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v1/fellows/cohorts?filter=all&location=all&ttl=all`;
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore({
    loading: false,
    fellowsProgressD0A: [],
    fellowsProgressD0B: [],
    error: null
  });
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it('dispatches LOAD_FELLOW_PROGRESS_REQUEST and LOAD_FELLOW_PROGRESS_SUCCESS on successfully fetching fellows progress', () => {
    const data = {
      fellowsProgressD0A: [],
      fellowsProgressD0B: []
    };
    mock
      .onGet(`${baseURL}&level=D0A`)
      .reply(200, { ...data })
      .onGet(`${baseURL}&level=D0B`)
      .reply(200, { ...data });
    const expectedActions = [
      { type: LOAD_FELLOW_PROGRESS_REQUEST },
      {
        type: LOAD_FELLOW_PROGRESS_SUCCESS,
        fellowsProgressD0A: {
          fellowsProgressD0A: []
        },
        fellowsProgressD0B: {
          fellowsProgressD0B: []
        }
      }
    ];
    return store.dispatch(getFellowProgress()).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toMatchObject(expectedActions);
    });
  });
});
