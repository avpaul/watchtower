import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  LOAD_FELLOW_LMS_RATINGS_REQUEST,
  LOAD_FELLOW_LMS_RATINGS_SUCCESS,
  LOAD_FELLOW_LMS_RATINGS_FAILURE
} from '../../constants/fellowLmsRatings';
import getFellowLmsRatings from '../fellowLmsRatingActions';

describe('Fellow LMS Ratings Actions', () => {
  const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;
  const baseURL = `${serverURL}/api/v1/fellow/lms?email=test.fellow@mail.com`;
  const mockStore = configureStore([thunk]);
  const mock = new MockAdapter(axios);
  const store = mockStore({
    loading: false,
    data: {},
    error: null
  });
  beforeEach(() => {
    store.clearActions();
  });

  afterEach(() => {
    mock.reset();
  });

  it('dispatches LOAD_FELLOW_LMS_RATINGS_REQUEST and LOAD_FELLOW_LMS_RATINGS_SUCCESS on successfully fetching fellow lms ratings', () => {
    const data = {
      outputs: []
    };
    mock.onGet(`${baseURL}`).reply(200, data);
    const expectedActions = [
      { type: LOAD_FELLOW_LMS_RATINGS_REQUEST },
      {
        type: LOAD_FELLOW_LMS_RATINGS_SUCCESS,
        lmsRatings: {
          outputs: []
        }
      }
    ];
    return store
      .dispatch(getFellowLmsRatings('test.fellow@mail.com'))
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toMatchObject(expectedActions);
      });
  });

  it('dispatches LOAD_FELLOW_LMS_RATINGS_REQUEST and  LOAD_FELLOW_LMS_RATINGS_FAILURE on failing to fetch managers fellows', () => {
    const expectedActions = [
      { type: LOAD_FELLOW_LMS_RATINGS_REQUEST },
      {
        type: LOAD_FELLOW_LMS_RATINGS_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];
    return store.dispatch(getFellowLmsRatings({ email: '' })).then(() => {
      const dispatchedActions = store.getActions();
      expect(dispatchedActions).toEqual(expectedActions);
    });
  });
});
