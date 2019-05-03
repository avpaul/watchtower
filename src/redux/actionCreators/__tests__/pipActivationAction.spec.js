import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import {
  ACTIVATION_FAILURE,
  ACTIVATION_SUCCESS,
  ACTIVATION_REQUEST
} from '../../constants/pipActivationTypes';
import activatePipAction, {
  activatePipSuccess,
  activatePipRequest
} from '../pipActivationActions';

const serverUrl = process.env.REACT_APP_WATCHTOWER_SERVER;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const payload = {
  started_at: '2019-10-11',
  duration_in_weeks: '3',
  attributes: [
    {
      attribute_name: 'quality',
      score: 1.2,
      description: 'You need to work on you quantity',
      activity: 'Here is what you should do',
      details: 'Some more context'
    },
    {
      attribute_name: 'communication',
      score: 1.2,
      description: 'You need to work on you quantity',
      activity: 'Here is what you should do',
      details: 'Some more context'
    }
  ],
  support: []
};

describe('Should activate pip and succeed', () => {
  let mock;
  let store;
  let fellowId;
  let url;
  beforeEach(() => {
    store = mockStore({});
    mock = new MockAdapter(axios);
    fellowId = 'fhhkjfhkhakhff';
    url = `${serverUrl}/api/v2/fellows/${fellowId}/ratings-pip`;
  });

  afterEach(() => {
    mock.reset();
    mock.restore();
    store.clearActions();
  });

  it('should try to activate pip', () => {
    const expectedAction = {
      type: ACTIVATION_REQUEST
    };
    expect(activatePipRequest({})).toEqual(expectedAction);
  });

  it('should activate pip and succeed', () => {
    const data = 'successfully';
    const expectedActions = {
      type: ACTIVATION_SUCCESS,
      data
    };
    expect(activatePipSuccess(data)).toEqual(expectedActions);
  });

  it('should try to activate pip and fail', done => {
    mock.onPost(url).reply(400);
    const expectedAction = [
      { type: ACTIVATION_REQUEST },
      { error: 'Request failed with status code 400', type: ACTIVATION_FAILURE }
    ];
    store
      .dispatch(activatePipAction(fellowId, payload))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      })
      .then(done)
      .catch(done.fail);
  });

  it('should activate pip successfully', done => {
    mock.onPost(url).reply(200);
    const expectedAction = [
      { type: ACTIVATION_REQUEST },
      { type: ACTIVATION_SUCCESS }
    ];
    store
      .dispatch(activatePipAction(fellowId, payload))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      })
      .then(done)
      .catch(done.fail);
  });
});
