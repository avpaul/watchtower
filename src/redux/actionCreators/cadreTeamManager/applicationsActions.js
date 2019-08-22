import { genericAPIGetRequest } from '../helpers';
import * as types from '../../constants/cadreTeamManager/applicationsTypes';

/**
 * An action creator for fetching all applications
 */
export const fetchApplications = () =>
  genericAPIGetRequest('projects/manager/applications', [
    types.FETCH_APPLICATIONS_REQUEST,
    types.FETCH_APPLICATIONS_SUCCESS,
    types.FETCH_APPLICATIONS_FAILURE
  ]);

export default {
  fetchApplications
};
