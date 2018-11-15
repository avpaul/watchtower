import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import FellowsSummary from '../FellowsSummary';
import FilterCard from '../../Filters/FilterCard';

const setup = propOverrides => {
  const props = {
    fellowsSummary: [
      { id: 'testkey1', title: 'Test key 1', totalFellows: 10 },
      { id: 'testkey2', title: 'Test key 2', totalFellows: 5 },
      { id: 'testkey3', title: 'Test key 3', totalFellows: 5 }
    ],
    handleCardClick: jest.fn(),
    ...propOverrides
  };

  const wrapper = shallow(<FellowsSummary {...props} />);

  return {
    props,
    wrapper,
    count: wrapper.find(FilterCard).length
  };
};

describe('<FellowsSummary />', () => {
  it('renders without crashing', () => {
    const { props } = setup();
    const div = document.createElement('div');
    ReactDOM.render(<FellowsSummary {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders three(3) <FilterCard />', () => {
    const { count } = setup();
    expect(count).toEqual(3);
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
