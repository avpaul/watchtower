import engineeringManagerTtlsReducer from './engineeringManagerTtlsReducer';
import {
  LOAD_ENGINEERING_MANAGER_TTLS_FAILURE,
  LOAD_ENGINEERING_MANAGER_TTLS_REQUEST,
  LOAD_ENGINEERING_MANAGER_TTLS_SUCCESS
} from '../constants/engineeringManagerTypes';
import initialState from './initialState';

it('should return the initial state for unknown action type', () => {
  expect(engineeringManagerTtlsReducer(undefined, {})).toEqual(
    initialState.engineeringManagerTtls
  );
});

it("should trigger loading to true when fetching engineering manager's data", () => {
  const newState = {
    loading: true,
    data: [],
    error: null
  };
  const action = { type: LOAD_ENGINEERING_MANAGER_TTLS_REQUEST };
  expect(
    engineeringManagerTtlsReducer(initialState.engineeringManagerTtls, action)
  ).toEqual(newState);
});

it("should add the error message on failing to fetch engineering manager's data", () => {
  const newState = {
    loading: false,
    data: [],
    error: { message: 'failed to fetch' }
  };
  const action = {
    type: LOAD_ENGINEERING_MANAGER_TTLS_FAILURE,
    error: { message: 'failed to fetch' }
  };
  expect(
    engineeringManagerTtlsReducer(initialState.engineeringManagerTtls, action)
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
    type: LOAD_ENGINEERING_MANAGER_TTLS_SUCCESS,
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
    engineeringManagerTtlsReducer(initialState.engineeringManagerTtls, action)
  ).toEqual(newState);
});
