import axios from 'axios';
import errorHandler from '../../services/errorHandler';
import {
  EDIT_CERTIFICATION_FAILURE,
  EDIT_CERTIFICATION_REQUEST,
  EDIT_CERTIFICATION_SUCCESS
} from '../constants/opsCertificationTypes';

import { UPDATE_CERTIFICATION } from '../constants/cadreCertificationTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

export const editCertificationRequest = () => ({
  type: EDIT_CERTIFICATION_REQUEST
});

export const editCertificationSuccess = (data = {}) => ({
  type: EDIT_CERTIFICATION_SUCCESS,
  data
});

export const editCertificationFailure = error => ({
  type: EDIT_CERTIFICATION_FAILURE,
  error: errorHandler(error)
});

export const updateCerticationInStore = (certificationId, data) => ({
  type: UPDATE_CERTIFICATION,
  data: { certificationId, data }
});

export const editCertification = (certificationId, data) => dispatch => {
  dispatch(editCertificationRequest());

  const requestUrl = `${serverURL}/api/v2/ops/certifications/${certificationId}`;

  return axios.patch(requestUrl, data).then(
    response => {
      dispatch(editCertificationSuccess(response.data));
      dispatch(updateCerticationInStore(certificationId, response.data.data));
    },
    error => {
      dispatch(editCertificationFailure(error));
    }
  );
};
