import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import FellowsSummary from '../FellowsSummary';
import FilterCard from '../../Filters/FilterCard';

const setup = propOverrides => {
  const { loggedInRole } = propOverrides;
  const props = {
    fellowsSummary: [
      { id: 'D0BFellowsCount', title: 'Test key 1', totalFellows: 10 },
      { id: 'D0AFellowsCount', title: 'Test key 2', totalFellows: 5 },
      { id: 'testkey3', title: 'Test key 3', totalFellows: 5 }
    ],
    handleCardClick: jest.fn(),
    displayByRole: {
      [`${loggedInRole}`]: '343242434'
    },
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
    const { props } = setup({ loggedInRole: 'WATCH_TOWER_OPS' });
    const div = document.createElement('div');
    ReactDOM.render(<FellowsSummary {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders three(3) <FilterCard />', () => {
    const { count } = setup({
      loggedInRole: 'WATCH_TOWER_OPS'
    });
    expect(count).toEqual(3);
  });

  it('renders only one card <FilterCard />', () => {
    const { count, wrapper } = setup({
      loggedInRole: 'WATCH_TOWER_EM'
    });
    expect(count).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders only DOA card <FilterCard /> when SL is logged in', () => {
    const { count, wrapper } = setup({
      loggedInRole: 'WATCH_TOWER_SL'
    });
    expect(count).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('handles click events on the <FilterCard />', () => {
    const {
      props: { handleCardClick },
      wrapper
    } = setup({ loggedInRole: 'WATCH_TOWER_OPS' });
    wrapper
      .find(FilterCard)
      .first()
      .simulate('click');
    expect(handleCardClick).toHaveBeenCalledTimes(1);
  });
});
