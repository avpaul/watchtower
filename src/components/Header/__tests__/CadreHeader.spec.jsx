import React from 'react';
import { shallow } from 'enzyme';
import CadreHeader from '../CadreHeader';

describe('test cadre header', () => {
  const props = {
    renderModal: jest.fn(),
    notifications: jest.fn(),
    unreadnotifications: jest.fn(),
    showModal: jest.fn()
  };
  it('should render properly', () => {
    const wrapper = shallow(<CadreHeader {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
