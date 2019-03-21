import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  LOAD_FELLOWBIO_REQUEST,
  LOAD_FELLOWBIO_FAILURE,
  LOAD_FELLOWBIO_SUCCESS
} from '../../constants/fellowBioTypes';
import getFellowBio from '../fellowBioActions';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

describe('Manager Fellow Actions', () => {
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const url = `${serverURL}/api/v1/fellows/profile?email=trust`;
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

  it('dispatches LOAD_FELLOWBIO_REQUEST and  LOAD_FELLOWBIO_ERROR on failing to fetch fellow', () => {
    const expectedActions = [
      { type: LOAD_FELLOWBIO_REQUEST },
      {
        type: LOAD_FELLOWBIO_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];
    return store.dispatch(getFellowBio({ email: '' })).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
  it('dispatches LOAD_FELLOWBIO_REQUEST and  LOAD_FELLOWBIO_SUCCESS on failing to fetch fellow', () => {
    const data = {
      fellow: undefined
    };

    mock.onGet(`${url}`).reply(200, data);

    const expectedActions = [
      { type: LOAD_FELLOWBIO_REQUEST },
      {
        type: LOAD_FELLOWBIO_SUCCESS,
        ...data
      }
    ];
    return store.dispatch(getFellowBio('trust')).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
});
