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
      opsSummary: {
        data: {
          managers: {
            ttls: [],
            lfs: [],
            averageFellowsPerTtl: 0,
            averageFellowsPerLf: 0
          },
          fellowsCount: {
            Total: 0
          },
          locations: []
        },
        loading: false
      }
    };
    const mockStore = configureStore();
    const store = mockStore(state);
    const wrapper = shallow(
      <FellowsSummaryChartContainer
        store={store}
        {...state}
        user={{
          name: 'Test User',
          picture: 'http://'
        }}
      />
    );
    expect(wrapper.props().fellowsSummary).toBeDefined();
  });
});
