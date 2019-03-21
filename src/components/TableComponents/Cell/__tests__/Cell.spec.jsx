import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Cell from '../Cell';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Cell>1</Cell>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders cell contents', () => {
  const wrapper = shallow(
    <Cell title="test" addedClass="class">
      1
    </Cell>
  );
  const cell = (
    <div className="dashboard-table__cell class" data-title="test">
      1
    </div>
  );
  expect(wrapper.contains(cell)).toEqual(true);
});
