import initialState from './initialState';
import * as types from '../constants/cadreCertificationTypes';
import genericReducer from './genericReducer';

const removeCertification = (certifications, certification) =>
  certifications.filter(cert => !(cert.id === certification));

export default (state = initialState.allCetifications, action) => {
  switch (action.type) {
    case types.FETCH_CERTIFICATION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.FETCH_CERTIFICATION_SUCCESS:
      return {
        error: null,
        loading: false,
        data: action.data
      };
    case types.FETCH_CERTIFICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case types.REMOVE_CERTIFICATION_ON_FOCUS:
      return {
        ...state,
        data: removeCertification(state.data, action.data)
      };
    default:
      return state;
  }
};

export const fetchCertificationsApplicantsReducer = (
  state = initialState.certificationApplicants,
  action
) =>
  genericReducer(
    [
      types.FETCH_CERTIFICATION_APPLICANTS_REQUEST,
      types.FETCH_CERTIFICATION_APPLICANTS_SUCCESS,
      types.FETCH_CERTIFICATION_APPLICANTS_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );

export const certificationApplicationReducer = (
  state = initialState.certificationApplication,
  action
) =>
  genericReducer(
    [
      types.CERTIFICATION_APPLICATION_REQUEST,
      types.CERTIFICATION_APPLICATION_SUCCESS,
      types.CERTIFICATION_APPLICATION_FAILURE
    ],
    state,
    {
      ...action,
      successData: action.data
    }
  );
