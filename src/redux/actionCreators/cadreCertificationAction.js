import { genericAPIGetRequest } from './helpers';
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

export default {
  fetchAllCertifications
};
