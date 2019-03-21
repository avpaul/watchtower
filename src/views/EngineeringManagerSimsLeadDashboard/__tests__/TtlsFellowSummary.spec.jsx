import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import TtlsFellowSummary from '../TtlsFellowSummary';
import FilterCard from '../../../components/Filters/FilterCard';

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

  const wrapper = mount(
    <MemoryRouter>
      <TtlsFellowSummary {...props} />
    </MemoryRouter>
  );

  return {
    props,
    wrapper,
    count: wrapper.find(FilterCard).length
  };
};

describe('<TtlsFellowSummary />', () => {
  it('renders without crashing', () => {
    const { props } = setup();
    const div = document.createElement('div');
    ReactDOM.render(<TtlsFellowSummary {...props} />, div);
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
