import React from 'react';
import { shallow } from 'enzyme';
import CadreLogout from '../CadreLogout';

describe('render cadre logout component', () => {
  it('should render properly', () => {
    const wrapper = shallow(<CadreLogout />);
    expect(wrapper).toMatchSnapshot();
  });
});
