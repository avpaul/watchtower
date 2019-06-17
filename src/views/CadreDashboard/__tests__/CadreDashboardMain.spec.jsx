import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import waitForExpect from 'wait-for-expect';
import CadreDashboard from '../CadreDashboardMain';

describe('Tests the CadreDashboard component', () => {
  const defaultProps = {
    match: {
      url: '/dashboard'
    },
    history: {
      replace: jest.fn()
    },
    location: {
      pathname: '/dashboard'
    }
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<CadreDashboard {...defaultProps} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should execute handleCardclick method', () => {
    const wrapper = mount(
      <MemoryRouter keyLength={0} initialEntries={['/dashboard']}>
        <CadreDashboard {...defaultProps} />
      </MemoryRouter>
    );

    const event = {
      target: {
        getAttribute: () => '0'
      }
    };

    wrapper
      .find('.cadre-side-card')
      .first()
      .simulate('click', event);

    waitForExpect(() => {
      expect(wrapper.find('CadreSideCard').exists()).toBeTruthy();
    });
  });

  it('should render properly', () => {
    const wrapper = shallow(<CadreDashboard {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
