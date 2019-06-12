import React from 'react';
import { shallow } from 'enzyme';
import CadreLogout from '../CadreLogout';

describe('test logout cadre component', () => {
  it('should render properly', () => {
    const wrapper = shallow(<CadreLogout />);
    expect(wrapper).toMatchSnapshot();
  });
});
