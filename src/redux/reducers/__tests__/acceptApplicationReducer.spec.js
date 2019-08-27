import applicationsReducer from '../cadreTeamManager/applicationsReducer';
import * as types from '../../constants/cadreTeamManager/applicationsTypes';

const data = {
  pending: [
    {
      id: 3,
      decision: 'pending',
      project: {
        id: 1,
        name: 'watch tower'
      },
      role: {
        id: 1,
        name: 'watching'
      },
      applicant: {
        id: 37,
        first_name: 'Test',
        last_name: 'Tower'
      }
    },
    {
      id: 1,
      decision: 'accepted',
      project: {
        id: 1,
        name: 'watch tower'
      },
      role: {
        id: 1,
        name: 'watching'
      },
      applicant: {
        id: 37,
        first_name: 'Test',
        last_name: 'Tower'
      }
    }
  ],
  accepted: [],
  rejected: []
};

const initialState = {
  loading: false,
  acceptLoading: false,
  data,
  error: {}
};

describe('test applications fetching', () => {
  it('should set loading state on fetching all applications', () => {
    const action = { type: types.FETCH_APPLICATIONS_REQUEST };
    expect(applicationsReducer(initialState, action)).toMatchObject({
      ...initialState.teamManagerProjectApplications,
      acceptLoading: false
    });
  });

  it('should execute the success action on fetching all applications', () => {
    const action = {
      type: types.FETCH_APPLICATIONS_SUCCESS,
      data
    };

    const newState = {
      ...initialState.teamManagerProjectApplications,
      acceptLoading: false,
      data,
      error: null
    };

    expect(applicationsReducer(initialState, action)).toMatchObject(newState);
  });
});

describe('test application acceptance', () => {
  it('should return the initial state for unknown action type', () => {
    expect(applicationsReducer(initialState, {})).toEqual({
      loading: false,
      acceptLoading: false,
      data,
      error: {}
    });
  });

  it('should set loading state on accepting applications', () => {
    const action = { type: types.ACCEPT_PROJECT_APPLICATIONS_REQUEST };
    expect(applicationsReducer(initialState, action)).toMatchObject({
      ...initialState.teamManagerProjectApplications,
      acceptLoading: true
    });
  });

  it('should execute the success action on accepting applications', () => {
    const action = {
      type: types.ACCEPT_PROJECT_APPLICATIONS_SUCCESS,
      data: {
        id: 1,
        decision: 'accepted',
        project: {
          id: 1,
          name: 'watch tower'
        },
        role: {
          id: 1,
          name: 'watching'
        },
        applicant: {
          id: 37,
          first_name: 'Test',
          last_name: 'Tower'
        }
      }
    };

    const newState = {
      ...initialState.teamManagerProjectApplications,
      acceptLoading: false,
      data: {
        pending: [data.pending[0]],
        accepted: [data.pending[1]],
        rejected: []
      },
      error: null
    };

    expect(applicationsReducer(initialState, action)).toMatchObject(newState);
  });

  it('should execute the failure action on accepting applications', () => {
    const action = {
      type: types.ACCEPT_PROJECT_APPLICATIONS_FAILURE,
      error: { message: 'error message' }
    };

    const newState = {
      ...initialState,
      error: action.error
    };

    expect(applicationsReducer(initialState, action)).toMatchObject(newState);
  });
});
