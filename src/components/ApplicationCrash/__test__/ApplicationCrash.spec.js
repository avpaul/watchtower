import React from 'react';
import { shallow } from 'enzyme';
import ApplicationCrash from '../ApplicationCrash';

describe('ApplicationCrash component', () => {
  it('it should render without crashing', () => {
    const wrapper = shallow(<ApplicationCrash />);
    wrapper.find('button').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
});
