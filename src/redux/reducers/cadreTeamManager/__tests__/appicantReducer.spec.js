import * as types from '../../../constants/cadreTeamManager/applicationsTypes';
import initialState from '../../initialState';
import { teamManagerProjectApplicantReducer } from '../applicantReducer';

describe('create role reducer', () => {
  it('should return the initial state', () => {
    expect(teamManagerProjectApplicantReducer(undefined, {})).toEqual(
      initialState.teamManagerProjectApplicant
    );
  });

  it('should handle request', () => {
    const newState = {
      "loading": true
    };
    const action = { type: types.FETCH_SINGLE_APPLICATIONS_REQUEST };
    expect(
      teamManagerProjectApplicantReducer(initialState.teamManagerProjectApplicant, action)
    ).toEqual(newState);
  });

  it('should handle  failure', () => {
    const error = 'there was an error processing request';
    const newState = {
      "error": "there was an error processing request",
      "loading": false
    };
    const action = { type: types.FETCH_SINGLE_APPLICATIONS_FAILURE, error };
    expect(
      teamManagerProjectApplicantReducer(initialState.teamManagerProjectApplicant, action)
    ).toEqual(newState);
  });

  it('should handle success', () => {
    const data = {
      name: 'success',
      description: 'role creation!',
      duration: 23,
      exclusive: false
    };
    const newState = {
      data,
      loading: false,
      error: null
    };
    const action = { type: types.FETCH_SINGLE_APPLICATIONS_SUCCESS, data };
    expect(
      teamManagerProjectApplicantReducer(initialState.teamManagerProjectApplicant, action)
    ).toEqual(newState);
  });
});
