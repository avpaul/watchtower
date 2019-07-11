import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  getCertificationRequest,
  getCertificationSuccess,
  getCertificationFailure,
  getCertification
} from '../getCertificationActions';
import {
  GET_CERTIFICATION_REQUEST,
  GET_CERTIFICATION_SUCCESS,
  GET_CERTIFICATION_FAILURE
} from '../../constants/certificationTypes';
import initialState from '../../reducers/initialState';

const serverUrl = process.env.REACT_APP_WATCHTOWER_SERVER;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Get Certification', () => {
  let mock;
  const data = {
    description: 'Sit sunt et sint dolore qui',
    id: 1,
    name: 'rerum'
  };
  const error = {
    repsonse: {
      data: {
        message: 'error'
      }
    }
  };
  const store = mockStore(initialState);
  const certificationId = '1';
  const url = `${serverUrl}/api/v2/ops/certifications/${certificationId}`;
  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
    mock.restore();
    store.clearActions();
  });

  it('should dispatch getCertificationRequest action', () => {
    expect(getCertificationRequest()).toEqual({
      type: GET_CERTIFICATION_REQUEST
    });
  });
  it('should dispatch getCertificationSuccess action without data', () => {
    expect(getCertificationSuccess()).toEqual({
      type: GET_CERTIFICATION_SUCCESS,
      data: {}
    });
  });
  it('should dispatch getCertificationSuccess action with data', () => {
    expect(getCertificationSuccess(data)).toEqual({
      type: GET_CERTIFICATION_SUCCESS,
      data
    });
  });
  it('should dispatch getCertificationFailure action without data', () => {
    expect(getCertificationFailure(error)).toEqual({
      type: GET_CERTIFICATION_FAILURE,
      error: 'Request was not sent'
    });
  });

  it('should getCertification action', done => {
    mock.onGet(url).reply(200, {});
    const expectedAction = [
      {
        type: GET_CERTIFICATION_REQUEST
      },
      {
        type: GET_CERTIFICATION_SUCCESS,
        data: {}
      }
    ];
    store
      .dispatch(getCertification(certificationId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      })
      .then(done)
      .catch(done.fail);
  });

  it('should getCertification action and fail', done => {
    mock.onGet(url).reply(404);
    const expectedAction = [
      {
        type: GET_CERTIFICATION_REQUEST
      },
      {
        type: GET_CERTIFICATION_FAILURE,
        error: 'Request failed with status code 404'
      }
    ];
    store
      .dispatch(getCertification(certificationId))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      })
      .then(done)
      .catch(done.fail);
  });
});
