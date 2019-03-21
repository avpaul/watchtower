import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Table from '../Table';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Table />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders row contents', () => {
  const wrapper = shallow(<Table>1</Table>);
  const row = <div className="dashboard-table">1</div>;
  expect(wrapper.contains(row)).toEqual(true);
});
