import { genericAPIPostRequest } from './helpers';
import * as types from '../constants/applyForRoleTypes';

const applyForRole = (projectId, roleId, applicationData) =>
  genericAPIPostRequest(
    `projects/${projectId}/roles/${roleId}/apply`,
    [types.APPLYREQUEST, types.APPLYSUCCESS, types.APPLYFAILURE],
    applicationData
  );

export default applyForRole;