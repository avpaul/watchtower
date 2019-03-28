import React from 'react';
import { shallow } from 'enzyme';
import PaginationWrapper from '../PaginationWrapper';
import fellows from '../../../__mocks__/fellows';

describe('Test Feedback Dashboard', () => {
  const props = {};

  /**
   * @description Creates an enzyme instance to test the Feedback Dashboard Page component.
   * @param mountComponent Renders a mounted enzyme wrapper if set to true
   * @param propOverrides Used to edit the props passed to the component when being mounted
   *
   * @returns { object } { props, feedbackDashboardWrapper }
   */
  const setup = (propsOverrides = {}) => {
    const newProps = { ...props, ...propsOverrides };
    const wrapper = shallow(<PaginationWrapper component={<div />} />);
    return { wrapper, props: newProps };
  };

  it('handlePaginationChange should change page state as expected', () => {
    const { wrapper } = setup();
    const filters = {
      page: 2,
      perPage: 25,
      totalPages: 0
    };

    wrapper.instance().handlePaginationPageChange(filters);
    expect(wrapper.state().paginationFilter.page).toBe(2);
  });

  it('updateData should update the state as expected', () => {
    const { wrapper } = setup();
    const filters = {
      page: 1,
      perPage: 25,
      totalPages: 0
    };

    wrapper.instance().updateData(fellows, filters);
    expect(wrapper.state().paginationFilter.totalPages).toBe(1);
    expect(wrapper.state().filteredData.length).toBe(fellows.length);
  });
});
