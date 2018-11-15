import cases from 'jest-in-case';
import fellowsSummaryReducer from '../fellowsSummaryReducer';
import {
  FETCH_FELLOWS_SUMMARY_REQUEST,
  FETCH_FELLOWS_SUMMARY_ERROR,
  FETCH_FELLOWS_SUMMARY_SUCCESS
} from '../../../constants/fellowActionTypes';

const initialState = {
  OpsDashboard: {
    fellowsSummary: {
      loading: false,
      data: {
        allFellowsCount: 0,
        D0AFellowsCount: 0,
        D0BFellowsCount: 0
      },
      error: ''
    }
  }
};

const testCases = [
  {
    name: 'should return the initial state',
    state: undefined,
    action: {},
    result: initialState.OpsDashboard.fellowsSummary
  },
  {
    name: 'should handle FETCH_FELLOWS_SUMMARY_REQUEST',
    state: initialState.OpsDashboard.fellowsSummary,
    action: { type: FETCH_FELLOWS_SUMMARY_REQUEST },
    result: { ...initialState.OpsDashboard.fellowsSummary, loading: true }
  },
  {
    name: 'should handle FETCH_FELLOWS_SUMMARY_ERROR',
    state: initialState.OpsDashboard.fellowsSummary,
    action: {
      type: FETCH_FELLOWS_SUMMARY_ERROR,
      error: 'error fetching fellowsSummary'
    },
    result: {
      ...initialState.OpsDashboard.fellowsSummary,
      error: 'error fetching fellowsSummary'
    }
  },
  {
    name: 'should handle FETCH_FELLOWS_SUMMARY_SUCCESS',
    state: initialState.OpsDashboard.fellowsSummary,
    action: {
      type: FETCH_FELLOWS_SUMMARY_SUCCESS,
      payload: {
        allFellowsCount: 10,
        D0AFellowsCount: 5,
        D0BFellowsCount: 5
      }
    },
    result: {
      ...initialState.OpsDashboard.fellowsSummary,
      data: {
        allFellowsCount: 10,
        D0AFellowsCount: 5,
        D0BFellowsCount: 5
      }
    }
  }
];

const testFn = ({ state, action, result }) => {
  expect(fellowsSummaryReducer(state, action)).toEqual(result);
};

cases('fellowsSummaryReducer', testFn, testCases);
