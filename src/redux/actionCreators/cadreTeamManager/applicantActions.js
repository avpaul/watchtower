import { genericAPIGetRequest } from '../helpers';
import * as types from '../../constants/cadreTeamManager/applicationsTypes';

/**
 * An action creator for fetching one applications
 */
export const fetchApplicantApplication = id =>
  genericAPIGetRequest(`projects/manager/applications/${id}`, [
    types.FETCH_SINGLE_APPLICATIONS_REQUEST,
    types.FETCH_SINGLE_APPLICATIONS_SUCCESS,
    types.FETCH_SINGLE_APPLICATIONS_FAILURE
  ]);

export default {
  fetchApplicantApplication
};
