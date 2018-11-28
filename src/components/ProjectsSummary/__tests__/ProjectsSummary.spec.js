import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ProjectsSummary from '../ProjectsSummary';
import FilterCard from '../../Filters/FilterCard';

const setup = () => {
  const props = {
    ttlProjects: {
      projects: {
        data: {
          projects: [
            { id: 'project1', title: 'Test project 1', totalFellows: 1 },
            { id: 'project2', title: 'Test project 2', totalFellows: 1 }
          ],
          totalFellows: 2
        }
      },
      totalFellows: 2
    },
    handleCardClick: jest.fn()
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
    expect(count).toEqual(1);
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
});