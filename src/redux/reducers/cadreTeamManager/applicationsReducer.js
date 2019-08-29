import * as types from '../../constants/cadreTeamManager/applicationsTypes';
import initialState from '../initialState';

const updateApplication = (existingApplications, approvedApplication) => {
  const { pending, accepted } = existingApplications;

  const pendingApplications = [...pending];
  const acceptedApplications = [...accepted];
  const singleApplicationIndex = pendingApplications.findIndex(
    application => application.id === approvedApplication.id
  );
  pendingApplications.splice(singleApplicationIndex, 1);
  acceptedApplications.push(approvedApplication);
  return {
    rejected: existingApplications.rejected,
    pending: pendingApplications,
    accepted: acceptedApplications
  };
};

export default (
  state = initialState.teamManagerProjectApplications,
  action
) => {
  switch (action.type) {
    case types.FETCH_APPLICATIONS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.ACCEPT_PROJECT_APPLICATIONS_REQUEST:
      return {
        ...state,
        acceptLoading: true
      };
    case types.FETCH_APPLICATIONS_SUCCESS:
      return {
        error: null,
        loading: false,
        acceptLoading: false,
        data: action.data
      };
    case types.ACCEPT_PROJECT_APPLICATIONS_SUCCESS:
      return {
        error: null,
        acceptLoading: false,
        acceptedApplication: action.data,
        data: updateApplication(state.data, action.data)
      };
    case types.FETCH_APPLICATIONS_FAILURE:
    case types.ACCEPT_PROJECT_APPLICATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        acceptLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};
