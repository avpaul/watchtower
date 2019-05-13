import React from 'react';
import { shallow } from 'enzyme';
import DashboardFilters from '../DashboardPage';
import fellows from '../../../__mocks__/fellows';

describe('Dashboard Page ', () => {
  const props = {
    filters: {
      search: '',
      criteria: 'All',
      level: 'All',
      status: 'All',
      cohort: 'All',
      statusType: 'All'
    },
    getFilter: jest.fn(),
    onDownloadDropdownClick: jest.fn(),
    onDownloadClick: jest.fn(),
    onSearchBarChange: jest.fn(),
    fellows
  };

  /**
   * @description Creates an enzyme instance to test the Dashboard Page component.
   * @param mountComponent Renders a mounted enzyme wrapper if set to true
   * @param propOverrides Used to edit the props passed to the component when being mounted
   *
   * @returns { object } { props, wrapper }
   */
  const setup = (propOverrides = {}) => {
    const newProps = { ...props, ...propOverrides };
    const wrapper = shallow(<DashboardFilters {...newProps} />);
    return { props, wrapper };
  };

  it('renders without crashing', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
