import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import TTLFellowsProgress from '../TTLFellowsProgress';
import Filter from '../../../OpsDashboard/FellowsProgress/Filter';
import StackedBarChart from '../../../../components/StackedBarChart';

const defaultProps = {
  fellowsProgress: {
    loading: false,
    data: {
      fellowsProgressD0: [
        {
          'On Track': 2,
          'Off Track': 1,
          PIP: 1,
          week: '10-Sep-2018'
        }
      ]
    }
  },
  fetchTTLFellowsProgress: jest.fn(),
  locations: [
    {
      id: 1,
      name: 'Lagos'
    }
  ]
};

const setup = propOverrides => {
  const props = { ...defaultProps, ...propOverrides };
  const getFilterSpy = jest.spyOn(TTLFellowsProgress.prototype, 'handleSelect');
  const wrapper = shallow(<TTLFellowsProgress {...props} />);

  return {
    props,
    wrapper,
    filterCount: wrapper.find(Filter).length,
    stackedBarChartCount: wrapper.find(StackedBarChart).length,
    getFilterSpy
  };
};

describe('<TTLFellowsProgress />', () => {
  it('renders without crashing', () => {
    const { props } = setup();
    const div = document.createElement('div');
    ReactDOM.render(<TTLFellowsProgress {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders <Filter />', () => {
    const { filterCount } = setup();
    expect(filterCount).toEqual(1);
  });

  it('renders <StackedBarChart />', () => {
    const { stackedBarChartCount } = setup();
    expect(stackedBarChartCount).toEqual(1);
  });

  it('calls getFilter when filter is changed', () => {
    const { wrapper, getFilterSpy } = setup();

    wrapper
      .find(Filter)
      .dive()
      .setState({ open: true })
      .find('.open__list_item')
      .first()
      .simulate('click', { target: { innerHTML: 'test ttl' } });

    expect(getFilterSpy).toHaveBeenCalledTimes(1);
  });
});
