import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ProjectsSummary from '../ProjectsSummary';
import FilterCard from '../../Filters/FilterCard';
import Loader from '../../Loader/Loader';

const setup = () => {
  const props = {
    fellowsSummary: {
      fellowsSummaryToday: {
        latestWeekSummary: {
          Total: 3,
          WatchTower: 3
        }
      },
      fellowsSummaryTrend: {
        latestWeekSummary: {
          Total: 3,
          WatchTower: 3
        }
      }
    },
    ttlProjects: {
      projects: {
        Total: 3,
        WatchTower: 3
      }
    },
    handleCardClick: jest.fn(),
    loading: false
  };

  const wrapper = shallow(<ProjectsSummary {...props} />);

  return {
    props,
    wrapper,
    count: wrapper.find(FilterCard).length
  };
};

describe('<ProjectsSummary />', () => {
  it('renders without crashing', () => {
    const { props } = setup();
    const div = document.createElement('div');
    ReactDOM.render(<ProjectsSummary {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

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
    const { props } = setup();
    const wrapper = shallow(
      <ProjectsSummary {...{ ...props, ...{ loading: true } }} />
    );
    expect(wrapper.contains(<Loader />)).toEqual(true);
  });
});
