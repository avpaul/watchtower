import React from 'react';
import { shallow } from 'enzyme';

import DashboardTable from '../DashboardTable';
import fellows from '../../../__mocks__/fellows';
import ErrorMessage from '../../Error/ErrorMessage';
import table from '../../../views/DashboardPage/tableHeaders';

const props = {
  fellows,
  loading: false,
  headers: table.default.titles,
  cellValues: table.default.cells
};

it('renders ErrorMessage when no fellows and is not fetching fellows', () => {
  const newProps = { ...props, fellows: [] };
  const wrapper = shallow(<DashboardTable {...newProps} />);

  expect(
    wrapper.contains(
      <ErrorMessage message="There's currently no fellows matching the filter and/or search." />
    )
  ).toEqual(true);
});

it('renders table cells in the correct order', () => {
  const event = {
    target: {
      getAttribute: () => 'Augustine'
    }
  };
  const wrapper = shallow(<DashboardTable {...props} />);
  expect(wrapper).toMatchSnapshot();
  wrapper.instance().arrowUpClick(event);
  expect(wrapper.state('sortBy')).toBe('Augustine');
  wrapper.instance().arrowDownClick(event);
  expect(wrapper.state('sortType')).toBe('ascending');
});
