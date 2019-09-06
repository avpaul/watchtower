import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
  editCertificationRequest,
  editCertificationSuccess,
  editCertificationFailure,
  editCertification,
  updateCerticationInStore
} from '../opsEditCertificationActions';
import {
  EDIT_CERTIFICATION_SUCCESS,
  EDIT_CERTIFICATION_REQUEST,
  EDIT_CERTIFICATION_FAILURE
} from '../../constants/opsCertificationTypes';

import { UPDATE_CERTIFICATION } from '../../constants/cadreCertificationTypes';

const serverUrl = process.env.REACT_APP_WATCHTOWER_SERVER;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Edit Certificate', () => {
  let mock;
  let store;
  let url;
  let certificationId;
  const errorMessage = 'Request failed with status code 404';
  const data = {};
  beforeEach(() => {
    store = mockStore({});
    mock = new MockAdapter(axios);
    certificationId = '1';
    url = `${serverUrl}/api/v2/ops/certifications/${certificationId}`;
  });

  afterEach(() => {
    mock.reset();
    mock.restore();
    store.clearActions();
  });

  it('should try to edit certificate', () => {
    const expectedAction = {
      type: EDIT_CERTIFICATION_REQUEST
    };
    expect(editCertificationRequest()).toEqual(expectedAction);
  });

  it('should edit certificate succesfully default', () => {
    const expectedAction = {
      data: {},
      type: EDIT_CERTIFICATION_SUCCESS
    };
    expect(editCertificationSuccess()).toEqual(expectedAction);
  });

  it('should edit certificate succesfully', () => {
    const expectedAction = {
      data: {},
      type: EDIT_CERTIFICATION_SUCCESS
    };
    expect(editCertificationSuccess(expectedAction.data)).toEqual(
      expectedAction
    );
  });

  it('should edit certificate failure', () => {
    const expectedAction = {
      type: EDIT_CERTIFICATION_FAILURE,
      error: errorMessage
    };
    expect(
      editCertificationFailure({
        message: errorMessage
      })
    ).toEqual(expectedAction);
  });

  it('should edit certificate', done => {
    mock.onPatch(url).reply(200, []);
    const expectedAction = [
      {
        type: EDIT_CERTIFICATION_REQUEST
      },
      {
        type: EDIT_CERTIFICATION_SUCCESS,
        data: []
      },
      {
        type: UPDATE_CERTIFICATION,
        data: {}
      }
    ];
    store
      .dispatch(editCertification(certificationId, data))
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedAction[1].type);
      })
      .then(done)
      .catch(done.fail);
  });

  it('should try to edit certificate and fail', done => {
    mock.onPatch(url).reply(404);
    const expectedAction = [
      {
        type: EDIT_CERTIFICATION_REQUEST
      },
      {
        type: EDIT_CERTIFICATION_FAILURE,
        error: errorMessage
      }
    ];
    store
      .dispatch(editCertification())
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      })
      .then(done)
      .catch(done.fail);
  });

  it('should update certification in store', () => {
    const expectedAction = {
      type: UPDATE_CERTIFICATION
    };

    expect(
      updateCerticationInStore(1, {
        certificationId: 1,
        data: { name: 'Product Engineer' }
      }).type
    ).toEqual(expectedAction.type);
  });
});
