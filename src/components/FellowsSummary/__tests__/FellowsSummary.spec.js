import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import FellowsSummary from '../FellowsSummary';
import FilterCard from '../../Filters/FilterCard';

const summary = {
  data: [{}, {}],
  keys: ['Total', 'D0A', 'D0B'],
  latestWeekSummary: {
    Total: 10,
    D0A: 5,
    D0B: 5
  }
};

const setup = (propOverrides, mountComponent = false) => {
  const { loggedInRole } = propOverrides;
  const props = {
    fellowsSummary: {
      loading: false,
      fellowsSummaryToday: summary,
      fellowsSummaryTrend: summary
    },
    handleCardClick: jest.fn(),
    displayByRole: {
      [`${loggedInRole}`]: '343242434'
    },
    ...propOverrides
  };

  const wrapper = mountComponent
    ? mount(
        <MemoryRouter>
          <FellowsSummary {...props} />
        </MemoryRouter>
      )
    : shallow(<FellowsSummary {...props} />);

  return { props, wrapper, count: wrapper.find(FilterCard).length };
};

describe('<FellowsSummary />', () => {
  const testByUserRole = (loggedInRole, testCount = 1) => {
    const { count } = setup({ loggedInRole }, true);
    expect(count).toEqual(testCount);
  };

  it('renders without crashing', () => {
    const { props } = setup({ loggedInRole: 'WATCH_TOWER_OPS' });
    const div = document.createElement('div');
    ReactDOM.render(<FellowsSummary {...props} />, div);
    const newProp = { ...props, displayByRole: null };
    ReactDOM.render(<FellowsSummary {...newProp} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders to match snapshots', () => {
    const { wrapper } = setup({ loggedInRole: 'WATCH_TOWER_OPS' });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders three(3) <FilterCard />', () => {
    testByUserRole('WATCH_TOWER_OPS', 3);
  });

  it('renders only one card <FilterCard />', () => {
    testByUserRole('WATCH_TOWER_EM');
  });

  it('renders only DOA card <FilterCard /> when SL is logged in', () => {
    testByUserRole('WATCH_TOWER_SL');
  });

  it('handles click events on the <FilterCard />', () => {
    const {
      props: { handleCardClick },
      wrapper
    } = setup({ loggedInRole: 'WATCH_TOWER_OPS' }, true);
    wrapper
      .find(FilterCard)
      .first()
      .simulate('click');
    expect(handleCardClick).toHaveBeenCalledTimes(1);
  });
});
