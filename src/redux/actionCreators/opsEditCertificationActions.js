import axios from 'axios';
// import { toast } from 'react-toastify';
import errorHandler from '../../services/errorHandler';
import {
  EDIT_CERTIFICATION_FAILURE,
  EDIT_CERTIFICATION_REQUEST,
  EDIT_CERTIFICATION_SUCCESS
} from '../constants/opsCertificationTypes';

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

export const editCertification = (certificationId, data) => dispatch => {
  dispatch(editCertificationRequest());

  const requestUrl = `${serverURL}/api/v2/ops/certifications/${certificationId}`;

  return axios.patch(requestUrl, data).then(
    response => {
      dispatch(editCertificationSuccess(response.data));
    },
    error => {
      dispatch(editCertificationFailure(error));
    }
  );
};