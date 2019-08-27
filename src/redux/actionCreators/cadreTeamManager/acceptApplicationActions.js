import { genericAPIPostRequest } from '../helpers';
import * as types from '../../constants/cadreTeamManager/applicationsTypes';

/**
 * An action creator for accepting an application
 */
export const acceptApplication = applicationId =>
  genericAPIPostRequest(
    `projects/manager/applications/${applicationId}/accept`,
    [
      types.ACCEPT_PROJECT_APPLICATIONS_REQUEST,
      types.ACCEPT_PROJECT_APPLICATIONS_SUCCESS,
      types.ACCEPT_PROJECT_APPLICATIONS_FAILURE
    ]
  );

export default {
  acceptApplication
};
