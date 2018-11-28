import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ProjectsSummaryChartContainer, {
  mapStateToProps
} from '../ProjectsSummaryChartContainer';
import initialState from '../../../redux/reducers/initialState';

describe('ProjectsSummaryChartContainer', () => {
  it('should map state to props', () => {
    const tree = mapStateToProps(initialState);
    expect(tree).toMatchSnapshot();
  });

  it('should map dispatch to props', () => {
    const state = {
      TTLDashboard: {
        loading: false,
        projects: [],
        error: null
      }
    };

    const mockStore = configureStore();
    const store = mockStore(state);
    const wrapper = shallow(<ProjectsSummaryChartContainer store={store} />);
    expect(wrapper.props().fetchTtlProjects).toBeDefined();
  });
});
