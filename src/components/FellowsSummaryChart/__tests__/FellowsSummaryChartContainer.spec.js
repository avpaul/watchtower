import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import FellowsSummaryChartContainer, {
  mapStateToProps
} from '../FellowsSummaryChartContainer';
import initialState from '../../../redux/reducers/initialState';
import managerProfileMock from '../../../__mocks__/managerProfile';
import { formatPerformanceData } from '../../../utils';

describe('FellowsSummaryChartContainer', () => {
  it('should map state to props', () => {
    const tree = mapStateToProps(initialState);
    expect(tree).toMatchSnapshot();
  });

  it('should map dispatch to props', () => {
    const state = {
      performanceData: {
        loading: false,
        data: {
          today: formatPerformanceData(managerProfileMock.performance.today),
          trend: formatPerformanceData(managerProfileMock.performance.trend)
        }
      }
    };

    const mockStore = configureStore([thunk]);
    const store = mockStore({ ...initialState, ...state });
    const wrapper = mount(
      <Provider store={store}>
        <FellowsSummaryChartContainer
          user={{
            name: 'Test User',
            picture: 'http://'
          }}
        />
      </Provider>
    );
    expect(
      wrapper.find('FellowsSummaryChart').props().fellowsPerformanceData
    ).toBeDefined();
  });
});
