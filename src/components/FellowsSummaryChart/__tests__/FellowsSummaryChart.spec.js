import React from 'react';
import { shallow } from 'enzyme';
import initialState from '../../../redux/reducers/initialState';
import configureStore from '../../../redux/store/configureStore';
import FellowChart from '../../FellowChart';
import FellowsSummaryChart from '../FellowsSummaryChart';
import FellowsSummaryContainer from '../../FellowsSummary';

const setup = propOverrides => {
  const props = {
    fetchFellowsSummary: jest.fn(),
    getFellowCountHistory: jest.fn(),
    fellowCountHistory: {
      countSummary: {},
      loading: false,
      error: null
    },
    ...propOverrides
  };
  const store = configureStore(initialState);

  const wrapper = shallow(<FellowsSummaryChart {...props} store={store} />);

  return {
    props,
    wrapper,
    fellowsSummaryCount: wrapper.find(FellowsSummaryContainer).length,
    fellowChartCount: wrapper.find(FellowChart).length,
    event: { currentTarget: { id: '', ...propOverrides } }
  };
};

const setupHandleCardClickExpect = (id, result) => {
  const { wrapper, event } = setup({ id });
  wrapper.instance().handleCardClick(event);
  expect(wrapper.state().fellowsSummaryFilter).toEqual(result);
};

describe('<FellowsSummaryChart />', () => {
  it('renders with default state', () => {
    const { wrapper, fellowChartCount, fellowsSummaryCount } = setup();

    expect(fellowChartCount).toEqual(0);
    expect(fellowsSummaryCount).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders <FellowChart />', () => {
    const { wrapper } = setup();
    wrapper.setState({ showChart: true });

    expect(wrapper.find(FellowChart).length).toEqual(1);
  });

  it('handles card Click', () => {
    setupHandleCardClickExpect('D0AFellowsCount', 'D0A');
    setupHandleCardClickExpect('D0BFellowsCount', 'D0B');
    setupHandleCardClickExpect('allFellowsCount', 'ALL');
  });

  it('closes the chart when the close button is clicked', () => {
    const { wrapper } = setup();
    wrapper.setState({ showChart: true });
    const handleChartCloseSpy = jest.spyOn(
      wrapper.instance(),
      'handleChartClose'
    );
    wrapper.instance().handleChartClose();
    expect(handleChartCloseSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().showChart).toBe(false);
  });
});
