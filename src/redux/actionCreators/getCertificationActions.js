import axios from 'axios';
import errorHandler from '../../services/errorHandler';

import {
  GET_CERTIFICATION_REQUEST,
  GET_CERTIFICATION_SUCCESS,
  GET_CERTIFICATION_FAILURE
} from '../constants/certificationTypes';

const serverURL = process.env.REACT_APP_WATCHTOWER_SERVER;

const getCertificationRequest = () => ({
  type: GET_CERTIFICATION_REQUEST
});

const getCertificationSuccess = (data = {}) => ({
  type: GET_CERTIFICATION_SUCCESS,
  data
});

const getCertificationFailure = error => ({
  type: GET_CERTIFICATION_FAILURE,
  error: errorHandler(error)
});

const getCertification = certificationId => dispatch => {
  dispatch(getCertificationRequest());

  const requestUrl = `${serverURL}/api/v2/ops/certifications/${certificationId}`;
  return axios
    .get(requestUrl)
    .then(
      response => dispatch(getCertificationSuccess(response.data.data)),
      error => dispatch(getCertificationFailure(error))
    );
};

export {
  getCertificationRequest,
  getCertificationSuccess,
  getCertificationFailure,
  getCertification
};
