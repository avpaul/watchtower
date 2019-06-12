import React from 'react';
import { shallow } from 'enzyme';
import CadreHeader from '../CadreHeader';

describe('test cadre header component', () => {
  const props = {
    renderModal: jest.fn(),
    notifications: [],
    unreadnotifications: [],
    showModal: jest.fn()
  };

  const wrapper = shallow(<CadreHeader {...props} />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
