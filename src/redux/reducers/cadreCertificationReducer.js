import initialState from './initialState';
import * as types from '../constants/cadreCertificationTypes';

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
