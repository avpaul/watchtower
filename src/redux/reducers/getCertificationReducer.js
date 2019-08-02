import initialState from './initialState';

import * as types from '../constants/cadreCertificationTypes';

const addNewApplication = (applications, newApplication) => {
  const existingApplications = [...applications];
  existingApplications.push(newApplication);
  return existingApplications;
};

export default (state = initialState.getCertification, action) => {
  switch (action.type) {
    case types.GET_CERTIFICATION_REQUEST:
    case types.CERTIFICATION_APPLICATION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.GET_CERTIFICATION_SUCCESS:
      return {
        error: null,
        loading: false,
        data: action.data
      };
    case types.GET_CERTIFICATION_FAILURE:
    case types.CERTIFICATION_APPLICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case types.CERTIFICATION_APPLICATION_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          applications: addNewApplication(state.data.applications, action.data)
        },
        loading: false
      };
    default:
      return state;
  }
};
