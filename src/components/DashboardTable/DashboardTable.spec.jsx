import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import DashboardTable from './DashboardTable';
import fellows from '../../__mocks__/fellows';
import ErrorMessage from '../Error/ErrorMessage';
import table from '../../views/DashboardPage/tableHeaders';

const props = {
  fellows,
  loading: false,
  headers: table.default.titles,
  cellValues: table.default.cells
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DashboardTable {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders ErrorMessage when no fellows and is not fetching fellows', () => {
  const wrapper = shallow(<DashboardTable {
    ...{ ...props, ...{ fellows: [] } }}
  />);

  expect(wrapper.contains(<ErrorMessage
    message="There's currently no fellows matching the filter and/or search."
  />))
    .toEqual(true);
});

it('renders table cells in the correct order', () => {
  const wrapper = shallow(<DashboardTable {...props} />);
  expect(wrapper).toMatchSnapshot();
});

it('renders to match snapshot', () => {
  const wrapper = mount(<DashboardTable {...props} />);
  expect(wrapper).toMatchSnapshot();
});
