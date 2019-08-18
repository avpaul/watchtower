import {
  genericAPIGetRequest,
  genericAPIDeleteRequest,
  genericAPIPostRequest
} from './helpers';
import * as types from '../constants/cadreCertificationTypes';
import {
  CERTIFICATION_APPLICATION_REQUEST,
  CERTIFICATION_APPLICATION_SUCCESS,
  CERTIFICATION_APPLICATION_FAILURE
} from '../constants/cadreVacanciesTypes';

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
    null,
    dispatch =>
      dispatch({
        type: types.REMOVE_CERTIFICATION_ON_FOCUS,
        data: certificationId
      })
  );

/**
 * An action creator responsible for fetching all certification applicants
 * @param integer the id of the certification
 * @return object An instance of a Promise
 */
export const fetchCertificationApplicants = certificationId =>
  genericAPIGetRequest(`certifications/${certificationId}/applications`, [
    types.FETCH_CERTIFICATION_APPLICANTS_REQUEST,
    types.FETCH_CERTIFICATION_APPLICANTS_SUCCESS,
    types.FETCH_CERTIFICATION_APPLICANTS_FAILURE
  ]);

/**
 * An action creator responsible for applying for a certification
 * @return object An instance of a Promise
 */
export const applyForCertification = (certificationId, reason, cycleId) =>
  genericAPIPostRequest(
    `certifications/${certificationId}/applications`,
    [
      CERTIFICATION_APPLICATION_REQUEST,
      CERTIFICATION_APPLICATION_SUCCESS,
      CERTIFICATION_APPLICATION_FAILURE
    ],
    { reason_for_applying: reason, cycle_id: cycleId }
  );

export default {
  fetchAllCertifications,
  deleteCertification,
  setCertificationOnFocus
};
