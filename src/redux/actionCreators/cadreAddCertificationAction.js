import { genericAPIPostRequest } from './helpers';
import * as types from '../constants/cadreAddCertificationTypes';

export const addCertification = certificationData =>
  genericAPIPostRequest(
    'ops/certifications',
    [
      types.ADD_CERTIFICATION_REQUEST,
      types.ADD_CERTIFICATION_SUCCESS,
      types.ADD_CERTIFICATION_FAILURE
    ],
    certificationData
  );

export default {
  addCertification
};
