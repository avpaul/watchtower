import React from 'react';
import { shallow } from 'enzyme';
import CadreDashboard from '../CadreDashboard';
import CadreSubmenu from '../../../components/CadreSubmenu';

describe('Tests the CadreDashboard component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CadreDashboard />);
  });

  it('should render without crushing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should execute handleCardclick method', () => {
    wrapper.setState({ activeItem: '0' });

    const event = {
      target: {
        getAttribute: () => '1'
      }
    };
    wrapper
      .find(CadreSubmenu)
      .dive()
      .find('.cadre-submenu-cards')
      .first()
      .simulate('click', event);

    expect(wrapper.state('activeItem')).toEqual('1');
  });
});
