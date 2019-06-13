import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import waitForExpect from 'wait-for-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Thunk from 'redux-thunk';

import CadreDashboard from '../CadreDashboard';
import initialState from '../../../redux/reducers/initialState';

describe('Tests the CadreDashboard component', () => {
  const defaultProps = {
    match: {
      url: '/cadre'
    },
    history: {
      replace: jest.fn()
    },
    location: {
      pathname: '/cadre/projects'
    }
  };

  it('should render without crushing', () => {
    const wrapper = shallow(<CadreDashboard {...defaultProps} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should execute handleCardclick method', () => {
    const mockStore = configureStore([Thunk]);
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter keyLength={0} initialEntries={['/cadre/reports']}>
          <CadreDashboard {...defaultProps} />
        </MemoryRouter>
      </Provider>
    );

    const event = {
      target: {
        getAttribute: () => '0'
      }
    };

    wrapper
      .find('.cadre-submenu-cards')
      .first()
      .simulate('click', event);

    waitForExpect(() => {
      expect(wrapper.find('ProjectsDashboard').exists()).toBeTruthy();
    });
  });
});
