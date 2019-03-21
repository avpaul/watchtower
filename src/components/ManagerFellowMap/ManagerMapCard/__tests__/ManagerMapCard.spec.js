import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import ManagerMapCard from '..';
import fellowManagers from '../../../../__mocks__/fellowManagers';

const fellowManager = fellowManagers.ttls[0];

const props = {
  manager: fellowManager
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ManagerMapCard {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders ManagerMap cards', () => {
  const wrapper = mount(<ManagerMapCard {...props} />);
  expect(wrapper.find('.manager-card')).toBeDefined();
});
