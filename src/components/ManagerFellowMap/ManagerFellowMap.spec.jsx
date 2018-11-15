import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import ManagerFellowSortInput from './ManagerFellowSortInput';
import ManagerFellowMap from '.';
import fellowManagers from '../../__mocks__/fellowManagers';

const props = {
  managers: fellowManagers.lfs,
  onSortManagers: jest.fn(),
  sortRatio: 'HIGH_TO_LOW',
  arrowStyle: { '--arrow-left-margin-style': '30%' },
  handleMapClose: jest.fn()
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ManagerFellowMap {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders ManagerMap cards with Default Ratio', () => {
  const wrapper = shallow(<ManagerFellowMap {...props} />);
  expect(wrapper.find('.manager_card')).toBeDefined();
  expect(wrapper.find(ManagerFellowSortInput)).toBeDefined();
});

it('renders ManagerMap cards with Low to High Ratio', () => {
  props.sortRatio = 'LOW_TO_HIGH';
  const wrapper = shallow(<ManagerFellowMap {...props} />);
  expect(wrapper.find('.manager_card')).toBeDefined();
  expect(wrapper.find(ManagerFellowSortInput)).toBeDefined();
});
