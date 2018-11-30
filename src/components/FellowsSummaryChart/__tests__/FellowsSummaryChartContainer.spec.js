import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import FellowsSummaryChartContainer, {
  mapStateToProps
} from '../FellowsSummaryChartContainer';
import initialState from '../../../redux/reducers/initialState';

describe('FellowsSummaryChartContainer', () => {
  it('should map state to props', () => {
    const tree = mapStateToProps(initialState);
    expect(tree).toMatchSnapshot();
  });

  it('should map dispatch to props', () => {
    const state = {
      opsDashboard: {
        fellowsSummary: {
          loading: false,
          fellowsSummaryToday: {},
          fellowsSummaryTrend: {},
          data: {
            allFellowsCount: 0,
            D0AFellowsCount: 0,
            D0BFellowsCount: 0
          },
          error: ''
        }
      },
      fellowCountHistory: {
        countSummary: {},
        loading: false,
        error: null
      }
    };
    const mockStore = configureStore();
    const store = mockStore(state);
    const wrapper = shallow(
      <FellowsSummaryChartContainer store={store} {...state} />
    );
    expect(wrapper.props().fetchFellowsSummary).toBeDefined();
  });
});
