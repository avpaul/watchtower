import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Thunk from 'redux-thunk';
import initialState from '../../../redux/reducers/initialState';
import CadreTeamManagerDashboard from '../CadreTeamManagersDashboard';

describe('Cadre Team Manager Dashboard', () => {
  let wrapper;
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      match: {
        url: '/cadre'
      },
      history: {
        replace: jest.fn()
      },
      location: {
        pathname: '/cadre/myteams'
      }
    };

    const mockStore = configureStore([Thunk]);
    const store = mockStore(initialState);

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter keyLength={0} initialEntries={['/cadre/myteams']}>
          <CadreTeamManagerDashboard {...defaultProps} />
        </MemoryRouter>
      </Provider>
    );
  });

  it('should render the team manager dashboard', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('cards should be clickable', () => {
    wrapper
      .find('.cadre-submenu-cards')
      .at(0)
      .props()
      .onClick({
        target: {
          getAttribute: () => 0
        }
      });

    expect(defaultProps.history.replace).toHaveBeenCalledWith('/cadre/myteams');
    expect(defaultProps.history.replace).toHaveBeenCalledTimes(1);
  });

  it('can not be called with paht that does not exist', () => {
    wrapper
      .find('.cadre-submenu-cards')
      .at(0)
      .props()
      .onClick({
        target: {
          getAttribute: () => '4'
        }
      });

    expect(defaultProps.history.replace).not.toHaveBeenCalled();
  });
});
