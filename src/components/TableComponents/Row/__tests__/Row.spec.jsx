import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Row from '../Row';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Row />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders plain row', () => {
  const wrapper = shallow(<Row>1</Row>);
  const row = <div className="dashboard-table__row">1</div>;
  expect(wrapper.contains(row)).toEqual(true);
});

it('renders header row', () => {
  const wrapper = shallow(<Row header>1</Row>);
  const row = <div className="dashboard-table__header">1</div>;
  expect(wrapper.contains(row)).toEqual(true);
});
