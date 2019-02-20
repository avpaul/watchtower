import cases from 'jest-in-case';
import fellowsSummaryReducer from '../fellowsSummaryReducer';
import {
  FETCH_EM_SUMMARY_REQUEST,
  FETCH_EM_SUMMARY_ERROR,
  FETCH_EM_SUMMARY_SUCCESS,
  FETCH_SL_SUMMARY_REQUEST,
  FETCH_SL_SUMMARY_ERROR,
  FETCH_SL_SUMMARY_SUCCESS,
  FETCH_LF_SUMMARY_REQUEST,
  FETCH_LF_SUMMARY_ERROR,
  FETCH_LF_SUMMARY_SUCCESS,
  FETCH_TTL_SUMMARY_REQUEST,
  FETCH_TTL_SUMMARY_ERROR,
  FETCH_TTL_SUMMARY_SUCCESS
} from '../../../constants/fellowSummary';

const initialState = {
  emsDashboard: {
    fellowsSummary: {
      loading: false,
      summary: [],
      error: ''
    }
  }
};

const summary = {
  data: [{}, {}]
};

const testCases = [
  {
    name: 'should return the initial state',
    state: undefined,
    action: {},
    result: initialState.emsDashboard.fellowsSummary
  },
  {
    name: 'should handle FETCH_EM_SUMMARY_REQUEST',
    state: initialState.emsDashboard.fellowsSummary,
    action: { type: FETCH_EM_SUMMARY_REQUEST },
    result: { ...initialState.emsDashboard.fellowsSummary, loading: true }
  },
  {
    name: 'should handle FETCH_EM_SUMMARY_ERROR',
    state: initialState.emsDashboard.fellowsSummary,
    action: {
      type: FETCH_EM_SUMMARY_ERROR,
      error: 'error fetching fellowsSummary'
    },
    result: {
      ...initialState.emsDashboard.fellowsSummary,
      error: 'error fetching fellowsSummary'
    }
  },
  {
    name: 'should handle FETCH_EM_SUMMARY_SUCCESS',
    state: initialState.emsDashboard.fellowsSummary,
    action: {
      type: FETCH_EM_SUMMARY_SUCCESS,
      summary
    },
    result: {
      ...initialState.emsDashboard.fellowsSummary,
      summary
    }
  },
  {
    name: 'should handle FETCH_SL_SUMMARY_REQUEST',
    state: initialState.emsDashboard.fellowsSummary,
    action: { type: FETCH_SL_SUMMARY_REQUEST },
    result: { ...initialState.emsDashboard.fellowsSummary, loading: true }
  },
  {
    name: 'should handle FETCH_SL_SUMMARY_ERROR',
    state: initialState.emsDashboard.fellowsSummary,
    action: {
      type: FETCH_SL_SUMMARY_ERROR,
      error: 'error fetching fellowsSummary'
    },
    result: {
      ...initialState.emsDashboard.fellowsSummary,
      error: 'error fetching fellowsSummary'
    }
  },
  {
    name: 'should handle FETCH_SL_SUMMARY_SUCCESS',
    state: initialState.emsDashboard.fellowsSummary,
    action: {
      type: FETCH_SL_SUMMARY_SUCCESS,
      summary
    },
    result: {
      ...initialState.emsDashboard.fellowsSummary,
      summary
    }
  },
  {
    name: 'should handle FETCH_LF_SUMMARY_REQUEST',
    state: initialState.emsDashboard.fellowsSummary,
    action: { type: FETCH_LF_SUMMARY_REQUEST },
    result: { ...initialState.emsDashboard.fellowsSummary, loading: true }
  },
  {
    name: 'should handle FETCH_LF_SUMMARY_ERROR',
    state: initialState.emsDashboard.fellowsSummary,
    action: {
      type: FETCH_LF_SUMMARY_ERROR,
      error: 'error fetching fellowsSummary'
    },
    result: {
      ...initialState.emsDashboard.fellowsSummary,
      error: 'error fetching fellowsSummary'
    }
  },
  {
    name: 'should handle FETCH_LF_SUMMARY_SUCCESS',
    state: initialState.emsDashboard.fellowsSummary,
    action: {
      type: FETCH_LF_SUMMARY_SUCCESS,
      summary
    },
    result: {
      ...initialState.emsDashboard.fellowsSummary,
      summary
    }
  },
  {
    name: 'should handle FETCH_TTL_SUMMARY_REQUEST',
    state: initialState.emsDashboard.fellowsSummary,
    action: { type: FETCH_TTL_SUMMARY_REQUEST },
    result: { ...initialState.emsDashboard.fellowsSummary, loading: true }
  },
  {
    name: 'should handle FETCH_TTL_SUMMARY_ERROR',
    state: initialState.emsDashboard.fellowsSummary,
    action: {
      type: FETCH_TTL_SUMMARY_ERROR,
      error: 'error fetching fellowsSummary'
    },
    result: {
      ...initialState.emsDashboard.fellowsSummary,
      error: 'error fetching fellowsSummary'
    }
  },
  {
    name: 'should handle FETCH_TTL_SUMMARY_SUCCESS',
    state: initialState.emsDashboard.fellowsSummary,
    action: {
      type: FETCH_TTL_SUMMARY_SUCCESS,
      summary
    },
    result: {
      ...initialState.emsDashboard.fellowsSummary,
      summary
    }
  }
];

const testFn = ({ state, action, result }) => {
  expect(fellowsSummaryReducer(state, action)).toEqual(result);
};

cases('fellowsSummaryReducer', testFn, testCases);
