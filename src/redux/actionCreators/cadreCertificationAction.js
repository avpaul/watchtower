import { genericAPIGetRequest, genericAPIDeleteRequest } from './helpers';
import * as types from '../constants/cadreCertificationTypes';

/**
 * An action creator responsible for fetching all certifications
 * @return object An instance of a Promise
 */
export const fetchAllCertifications = () =>
  genericAPIGetRequest('ops/certifications', [
    types.FETCH_CERTIFICATION_REQUEST,
    types.FETCH_CERTIFICATION_SUCCESS,
    types.FETCH_CERTIFICATION_FAILURE
  ]);

/**
 * Sets the Certification on focus for editing or deleting.
 *
 * @param integer the id of the certification
 * @return object A redux action
 */
export const setCertificationOnFocus = certificationId => ({
  type: types.SET_CERTIFICATION_ON_FOCUS,
  data: certificationId
});

/**
 * An action creator responsible for deleting Certification
 * @param integer the id of the certification to be deleted
 * @return object An instance of a Promise
 */
export const deleteCertification = certificationId =>
  genericAPIDeleteRequest(
    `ops/certifications/${certificationId}`,
    [
      types.DELETE_CERTIFICATION_REQUEST,
      types.DELETE_CERTIFICATION_SUCCESS,
      types.DELETE_CERTIFICATION_FAILURE
    ],
    dispatch =>
      dispatch({
        type: types.REMOVE_CERTIFICATION_ON_FOCUS,
        data: certificationId
      })
  );

export default {
  fetchAllCertifications,
  deleteCertification,
  setCertificationOnFocus
};
