import simulationsLeadLfsReducer from './simulationsLeadLfsReducer';
import {
  LOAD_SIMULATIONS_LEAD_LF_REQUEST,
  LOAD_SIMULATIONS_LEAD_LF_SUCCESS,
  LOAD_SIMULATIONS_LEAD_LF_FAILURE
} from '../constants/simulationsLeadTypes';
import initialState from './initialState';

it('should return the initial state for unknown action type', () => {
  expect(simulationsLeadLfsReducer(undefined, {})).toEqual(
    initialState.simulationsLeadLfs
  );
});

it('should trigger loading to true when the action to fetch SimulationsLead data is called', () => {
  const newState = {
    loading: true,
    data: [],
    error: null
  };
  const action = { type: LOAD_SIMULATIONS_LEAD_LF_REQUEST };
  expect(
    simulationsLeadLfsReducer(initialState.simulationsLeadLfs, action)
  ).toEqual(newState);
});

it("should add the error message on failing to fetch SimulationsLead's data", () => {
  const newState = {
    loading: false,
    data: [],
    error: { message: 'failed to fetch' }
  };
  const action = {
    type: LOAD_SIMULATIONS_LEAD_LF_FAILURE,
    error: { message: 'failed to fetch' }
  };
  expect(
    simulationsLeadLfsReducer(initialState.simulationsLeadLfs, action)
  ).toEqual(newState);
});

it("should add fetched SimulationsLead's data to state on success", () => {
  const newState = {
    loading: false,
    data: [
      {
        lfs: [
          {
            firstName: 'Martin',
            lastName: 'Bbaale',
            email: 'martin.bbaale@andela.com'
          }
        ],
        averageFellowsPerLf: 1
      }
    ],
    error: null
  };
  const action = {
    type: LOAD_SIMULATIONS_LEAD_LF_SUCCESS,
    data: [
      {
        lfs: [
          {
            firstName: 'Martin',
            lastName: 'Bbaale',
            email: 'martin.bbaale@andela.com'
          }
        ],
        averageFellowsPerLf: 1
      }
    ]
  };
  expect(
    simulationsLeadLfsReducer(initialState.simulationsLeadLfs, action)
  ).toEqual(newState);
});
