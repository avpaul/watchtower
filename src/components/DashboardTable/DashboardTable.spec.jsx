import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import DashboardTable from './DashboardTable';
import Cell from '../TableComponents/Cell';
import fellows from '../../__mocks__/fellows';
import ErrorMessage from '../Error/ErrorMessage';

const props = {
  fellows,
  loading: false,
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
  const tableCells = [<Cell title="">Level</Cell>,
    <Cell title="">Quantity</Cell>];
  expect(wrapper.contains(tableCells)).toEqual(true);
});

it('renders the table header', () => {
  const wrapper = mount(<DashboardTable {...props} />);
  const nameCell = <div className="dashboard-table__cell" data-title="">Fellow Name</div>;
  const levelCell = <div className="dashboard-table__cell" data-title="">Quantity</div>;
  expect(wrapper.contains(nameCell, levelCell)).toEqual(true);
});
