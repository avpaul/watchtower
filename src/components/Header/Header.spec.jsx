import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header Component Test Suite', () => {
  let wrapper;
  beforeAll(() => {
    const user = {
      name: 'Test User',
      picture: 'http://',
    };
    const role = 'Technology';
    wrapper = shallow(<Header user={user} role={role} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('renders header top properly', () => {
    expect(wrapper.find('.watch-tower').text()).toEqual('WatchTower');
    expect(wrapper.find('Menu').length).toEqual(1);
    expect(wrapper.find('.user__text').text()).toEqual('Test User');
  });

  it('should update state when handleMenuClick is called on the inactive element', () => {
    wrapper.setState({
      activeItems: {
        fellows: true,
        settings: false,
      },
    });
    const event = {
      preventDefault: jest.fn(),
      target: {
        dataset: {
          linkKey: 'settings',
        },
      },
    };
    const handleMenuClickSpy = jest.spyOn(wrapper.instance(), 'handleMenuClick');
    wrapper.instance().handleMenuClick(event);
    expect(handleMenuClickSpy).toHaveBeenCalled();
    expect(wrapper.state('activeItems').settings).toEqual(true);
    expect(wrapper.state('activeItems').fellows).toEqual(false);
  });

  it('should not update state when handleMenuClick is called on the active element', () => {
    wrapper.setState({
      activeItems: {
        fellows: true,
        settings: false,
      },
    });
    const event = {
      preventDefault: jest.fn(),
      target: {
        dataset: {
          linkKey: 'fellows',
        },
      },
    };
    const handleMenuClickSpy = jest.spyOn(wrapper.instance(), 'handleMenuClick');
    wrapper.instance().handleMenuClick(event);
    expect(handleMenuClickSpy).toHaveBeenCalled();
    expect(wrapper.state('activeItems').settings).toEqual(false);
    expect(wrapper.state('activeItems').fellows).toEqual(true);
  });

  it('calls render notification', () => {
    const mounted = jest.spyOn(wrapper.instance(), 'renderNotification');
    wrapper.instance().renderNotification();
    expect(mounted).toHaveBeenCalled();
  });

  it('calls hide modal', () => {
    const mounted = jest.spyOn(wrapper.instance(), 'hideModal');
    wrapper.instance().hideModal();
    expect(mounted).toHaveBeenCalled();
  });
});
