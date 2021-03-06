import initialState from './initialState';
import * as types from '../constants/cadreCertificationTypes';
import genericReducer from './genericReducer';

export const removeCertification = (certifications, certification) =>
  certifications.filter(cert => !(cert.id === certification));

export const updateCertification = (
  certifications,
  certificationId,
  certification
) => {
  const { description, duration, exclusive, id, name } = certification;
  const certificationIndex = certifications.findIndex(
    cert => cert.id === certificationId
  );
  return [
    ...certifications.slice(0, certificationIndex),
    {
      ...certifications[certificationIndex],
      description,
      duration: Number(duration),
      exclusive,
      id,
      name
    },
    ...certifications.slice(certificationIndex + 1, certifications.length)
  ];
};

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
    case types.UPDATE_CERTIFICATION:
      return {
        ...state,
        data: updateCertification(
          state.data,
          action.data.certificationId,
          action.data.data
        )
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

export const fetchCertifiedEngineers = (
  state = { loading: false, data: [], error: null },
  action
) =>
  genericReducer(
    [
      types.GET_CERTIFIED_ENGINEERS_REQUEST,
      types.GET_CERTIFIED_ENGINEERS_SUCCESS,
      types.GET_CERTIFICATION_FAILURE
    ],
    state,
    { ...action, successData: action.data }
  );
