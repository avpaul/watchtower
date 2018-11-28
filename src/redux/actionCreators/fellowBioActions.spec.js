import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  LOAD_FELLOWBIO_REQUEST,
  LOAD_FELLOWBIO_FAILURE
} from '../constants/fellowBioTypes';
import getFellowBio from './fellowBioActions';

describe('Manager Fellow Actions', () => {
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
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

  it('dispatches LOAD_FELLOWBIO_REQUEST and  LOAD_FELLOWBIO_SUCCESS on failing to fetch fellow', () => {
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
});
