import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import DashboardRow from '../DashboardRow';
import fellows from '../../../../__mocks__/fellows';
import fellowCells from '../../../../__mocks__/fellowCells';

const fellow = fellows[0];

const props = {
  fellow,
  fellowCells
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DashboardRow {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders to match snapshot', () => {
  const wrapper = mount(<DashboardRow {...props} />);
  expect(wrapper).toMatchSnapshot();
});
