import fetchEngineerReportReducer from '../engineersReportReducer';
import * as types from '../../constants/engineersReportTypes';
import initialState from '../initialState';

describe('fetch cadre engineers', () => {
  it('should return the initial state', () => {
    expect(fetchEngineerReportReducer(undefined, {})).toEqual(
      initialState.reports
    );
  });

  it('should update state when request is successful', () => {
    const newState = {
      loading: false,
      data: [
        {
          id: 1,
          email: 'chidozie.nwoga@andela.com',
          account_active: false
        }
      ],
      error: '',
      meta: initialState.reports.meta
    };
    const action = {
      type: types.FETCH_ENGINEER_REPORT_SUCCESS,
      data: [
        {
          id: 1,
          email: 'chidozie.nwoga@andela.com',
          account_active: false
        }
      ],
      meta: initialState.reports.meta
    };
    expect(fetchEngineerReportReducer(initialState.reports, action)).toEqual(
      newState
    );
  });

  it('should update error if request fails', () => {
    const newState = {
      data: [],
      error: 'Network error',
      loading: false,
      meta: initialState.reports.meta
    };

    const action = {
      type: types.FETCH_ENGINEER_REPORT_FAILURE,
      error: 'Network error'
    };
    expect(fetchEngineerReportReducer(initialState.reports, action)).toEqual(
      newState
    );
  });

  it('should update error if request fails', () => {
    const newState = {
      data: [],
      error: '',
      loading: true,
      meta: initialState.reports.meta
    };

    const action = {
      type: types.FETCH_ENGINEER_REPORT_REQUEST,
      error: 'Network error'
    };
    expect(fetchEngineerReportReducer(initialState.reports, action)).toEqual(
      newState
    );
  });
});
