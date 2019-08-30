import { genericAPIPostRequest } from './helpers';
import * as types from '../constants/cadreVacanciesTypes';

const applyForRole = (projectId, roleId, applicationData) =>
  genericAPIPostRequest(
    `projects/${projectId}/roles/${roleId}/apply`,
    [
      types.ROLE_APPLICATION_REQUEST,
      types.ROLE_APPLICATION_SUCCESS,
      types.ROLE_APPLICATION_FAILURE
    ],
    applicationData
  );

export default applyForRole;
