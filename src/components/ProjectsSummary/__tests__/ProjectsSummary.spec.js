import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ProjectsSummary from '../ProjectsSummary';
import FilterCard from '../../Filters/FilterCard';
import Loader from '../../Loader/Loader';
import FellowsMock from '../../../__mocks__/fellows.json';

const props = {
  manager: {
    loading: false,
    data: {
      fellows: FellowsMock,
      projects: [
        {
          count: 3,
          project: 'WatchTower'
        }
      ],
      performance: {
        today: {
          latestWeekSummary: {
            Total: 3,
            WatchTower: 3
          }
        },
        trend: {
          latestWeekSummary: {
            Total: 3,
            WatchTower: 3
          }
        }
      }
    }
  },
  handleCardClick: jest.fn(),
  loading: false,
  ProjectsSummaryChartComponent: {
    filterCardRefs: []
  }
};

const setup = () => {
  const wrapper = shallow(<ProjectsSummary {...props} />);
  return {
    props,
    wrapper,
    count: wrapper.find(FilterCard).length
  };
};

describe('<ProjectsSummary />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProjectsSummary {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  jest.mock('');
  it('renders four <FilterCard />', () => {
    const { count } = setup();
    expect(count).toEqual(2);
  });

  it('handles click events on the <FilterCard />', () => {
    const {
      props: { handleCardClick },
      wrapper
    } = setup();
    wrapper
      .find(FilterCard)
      .first()
      .simulate('click');
    expect(handleCardClick).toHaveBeenCalledTimes(1);
  });

  it('renders correctly when project summary details are loading', () => {
    const newProps = { ...props };
    newProps.manager.loading = true;
    const wrapper = shallow(<ProjectsSummary {...newProps} />);
    expect(wrapper.contains(<Loader />)).toEqual(true);
  });
});
