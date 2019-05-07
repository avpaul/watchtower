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
    const mockStore = configureStore();
    const store = mockStore({ ...initialState });
    const wrapper = shallow(
      <ProjectsSummaryChartContainer
        store={store}
        user={{
          name: 'Trust Birungi',
          email: {
            includes: jest.fn()
          }
        }}
      />
    );
    expect(wrapper.props().fetchPerformanceData).toBeDefined();
  });
});
