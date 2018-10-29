import React from 'react';
import { shallow } from 'enzyme';
import LogOutModal from './LogOutModal';

describe('Logout Component Test Suite', () => {
  it('should render properly', () => {
    const wrapper = shallow(<LogOutModal />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('.modal').length).toEqual(1);
    expect(wrapper.find('button').length).toEqual(3);
    wrapper.find('button').last().simulate('click');
    expect(wrapper.state('logout')).toEqual(true);
  });
});
