import React from 'react';
import { mount, shallow } from 'enzyme';
import { FellowHistory } from '../FellowHistory';

describe('Fellow History Container', () => {
  const fellow = {
    id: 10,
    picture: null,
    project: 'Watch Tower',
    email: 'kingsley.obot@andela.com',
    user: {
      firstName: 'Kingsley',
      lastName: 'Obot'
    }
  };

  const fellowWithManager = { ...fellow };
  fellowWithManager.manager = {
    firstName: 'John',
    lastName: 'Doe',
    image: null,
    roleId: 2,
    detail: `${fellow.user.firstName}'s TTL`
  };

  /**
   ** Creates an enzyme instance to test the FellowHistory component.
   * @function
   * @param mountComponent Renders a mounted enzyme wrapper if set to true
   * @param propOverrides Used to edit the props passed to the component when being mounted
   *
   * @returns { wrapper, props }
   */
  const setup = (mountComponent = false, propOverrides = {}) => {
    let props = {
      match: { params: { name: 'kingsley.obot' } },
      fellowSummaryDetails: [fellow]
    };

    props = { ...props, ...propOverrides };

    const wrapper = mountComponent
      ? mount(<FellowHistory {...props} />)
      : shallow(<FellowHistory {...props} />);

    return { props, wrapper };
  };

  /**
   ** A reusable function used to test the fellow history card for the expected details
   * @function
   * @param wrapper The enzyme instance used to query for the specific dom elements
   * @param user The expected user's (Fellow/TTL/LF) details.
   */
  const testFellowHistoryCard = (
    wrapper,
    user = {
      ...fellow.user,
      detail: fellow.project
    }
  ) => {
    expect(wrapper.find('.fellow-history-card__name').text()).toEqual(
      `${user.firstName} ${user.lastName}`
    );
    expect(wrapper.find('.fellow-history-card__detail').text()).toEqual(
      user.detail
    );
  };

  it('renders to match shapshot', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the expected fellow profile details on update', () => {
    const { wrapper, props } = setup(true, {
      history: { push: jest.fn() },
      fellowSummaryDetails: []
    });

    const action = jest.spyOn(wrapper.instance(), 'setFellow');

    wrapper.setProps({ fellowSummaryDetails: [fellow] }, () => {
      setTimeout(() => {
        expect(props.history.push).not.toBeCalled();
        expect(action).toBeCalled();
        testFellowHistoryCard(wrapper);
      }, 100);
    });
  });

  it('renders the expected fellow profile details', () => {
    const newFellow = {
      ...fellow,
      devPulseAverage: '2',
      lmsOutput: '17/18'
    };

    const { wrapper, props } = setup(true, {
      history: { push: jest.fn() },
      fellowSummaryDetails: [newFellow]
    });

    testFellowHistoryCard(wrapper);
    expect(props.history.push).not.toBeCalled();
  });

  it('renders fellows page if fellow not found', () => {
    let currentPath = '';
    setup(true, {
      match: { params: { name: 'Kingsley.Obota' } },
      history: {
        push: url => {
          currentPath = url;
        }
      }
    });

    expect(currentPath).toEqual('/dashboard/fellows');
  });

  const testManagerByRole = (currentFellow = fellowWithManager) => {
    const { wrapper, props } = setup(true, {
      history: { push: jest.fn() },
      fellowSummaryDetails: [currentFellow]
    });

    const fellowCard = wrapper.find('.fellow-history-card').at(1);
    testFellowHistoryCard(fellowCard, currentFellow.manager);
    expect(props.history.push).not.toBeCalled();
  };

  it('renders the expected TTL details', () => {
    testManagerByRole();
  });

  it('renders the expected LF details', () => {
    fellowWithManager.manager.roleId = 3;
    fellowWithManager.manager.detail = `${fellow.user.firstName}'s LF`;
    testManagerByRole(fellowWithManager);
  });

  it('renders the expected manager details with an undefined role', () => {
    fellowWithManager.manager.roleId = 99;
    fellowWithManager.manager.detail = `${fellow.user.firstName}'s Undefined`;
    testManagerByRole(fellowWithManager);
  });
});