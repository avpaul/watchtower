import { genericAPIPostRequest } from './helpers';
import * as types from '../constants/applyForRoleTypes';

const applyForRole = (project, vacancy, applicationData) =>
  genericAPIPostRequest(
    `projects/${project}/vacancies/${vacancy}/apply`,
    [types.APPLYREQUEST, types.APPLYSUCCESS, types.APPLYFAILURE],
    applicationData
  );

export default applyForRole;
