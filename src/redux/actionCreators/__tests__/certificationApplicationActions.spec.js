import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import * as types from '../../constants/certificationTypes';
import { applyForCertification } from '../cadreCertificationActions';

const serverUrl = process.env.REACT_APP_WATCHTOWER_SERVER;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Certification Application', () => {
  let mock;
  let store;
  let url;
  let certificationId;

  beforeEach(() => {
    store = mockStore({});
    mock = new MockAdapter(axios);
    certificationId = 1;
    url = `${serverUrl}/api/v2/certifications/${certificationId}/applications`;
  });

  afterEach(() => {
    mock.reset();
    mock.restore();
    store.clearActions();
  });

  it('should send request to apply for a certification and fail', () => {
    mock.onPost(url).reply(400);
    const expectedAction = [
      { type: types.CERTIFICATION_APPLICATION_REQUEST },
      {
        error: 'Request failed with status code 400',
        type: types.CERTIFICATION_APPLICATION_FAILURE
      }
    ];
    store
      .dispatch(applyForCertification(certificationId))
      .then(() => expect(store.getActions()).toEqual(expectedAction));
  });

  it('should send request to apply for certification and succeed', () => {
    const data = {
      projectCertificationsId: 14,
      fellowId: 21,
      updatedAt: '2019-07-10 20:04:22',
      createdAt: '2019-07-10 20:04:22',
      id: 2
    };

    mock.onPost(url).reply(200, { data });
    const expectedAction = [
      { type: types.CERTIFICATION_APPLICATION_REQUEST },
      {
        type: types.CERTIFICATION_APPLICATION_SUCCESS,
        data
      }
    ];
    store
      .dispatch(applyForCertification(certificationId))
      .then(() => expect(store.getActions()).toEqual(expectedAction));
  });
});
