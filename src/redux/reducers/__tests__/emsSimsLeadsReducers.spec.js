import emsSimsLeadsReducers from '../emsSimsLeadsReducers';
import {
  LOAD_EM_SIMSLEADS_FAILURE,
  LOAD_EM_SIMSLEADS_REQUEST,
  LOAD_EM_SIMSLEADS_SUCCESS
} from '../../constants/emsSimsLeadsTypes';
import initialState from '../initialState';

it('should return the initial state for unknown action type', () => {
  expect(emsSimsLeadsReducers(undefined, {})).toEqual(
    initialState.engineeringManagerSimsLeads
  );
});

it("should trigger loading to true when fetching engineering manager's data", () => {
  const newState = {
    loading: true,
    data: [],
    error: null
  };
  const action = { type: LOAD_EM_SIMSLEADS_REQUEST };
  expect(
    emsSimsLeadsReducers(initialState.engineeringManagerSimsLeads, action)
  ).toEqual(newState);
});

it("should add the error message on failing to fetch engineering manager's data", () => {
  const newState = {
    loading: false,
    data: [],
    error: { message: 'failed to fetch' }
  };
  const action = {
    type: LOAD_EM_SIMSLEADS_FAILURE,
    error: { message: 'failed to fetch' }
  };
  expect(
    emsSimsLeadsReducers(initialState.engineeringManagerSimsLeads, action)
  ).toEqual(newState);
});

it("should add fetched engineering manager's data to state on success", () => {
  const newState = {
    loading: false,
    data: [
      {
        ttls: [
          {
            firstName: 'trust',
            lastName: 'birungi',
            email: 'trust.birungi@mail.com'
          }
        ],
        averageFellowsPerTtl: 1
      }
    ],
    error: null
  };
  const action = {
    type: LOAD_EM_SIMSLEADS_SUCCESS,
    data: [
      {
        ttls: [
          {
            firstName: 'trust',
            lastName: 'birungi',
            email: 'trust.birungi@mail.com'
          }
        ],
        averageFellowsPerTtl: 1
      }
    ]
  };
  expect(
    emsSimsLeadsReducers(initialState.engineeringManagerSimsLeads, action)
  ).toEqual(newState);
});
