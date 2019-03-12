import React from 'react';
import { MemoryRouter } from 'react-router-dom';
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
  const setup = (mountComponent = false, propOverrides = {}, urlPath) => {
    let props = {
      match: { params: { name: 'kingsley.obot' } },
      fellowSummaryDetails: [fellow],
      ratings: [{}],
      ratingsLoading: false,
      getFellowDevPulse: jest.fn()
    };

    props = { ...props, ...propOverrides };

    const wrapper = mountComponent
      ? mount(
          <MemoryRouter initialEntries={[urlPath]}>
            <FellowHistory {...props} />
          </MemoryRouter>
        )
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
    const { wrapper, props } = setup(
      true,
      {
        history: { push: jest.fn() },
        fellowSummaryDetails: []
      },
      '/dashboard/fellows/:name'
    );
    const action = jest.spyOn(
      wrapper.find(FellowHistory).instance(),
      'setFellow'
    );

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

    const { wrapper, props } = setup(
      true,
      {
        history: { push: jest.fn() },
        fellowSummaryDetails: [newFellow]
      },
      '/dashboard/fellows/:name'
    );

    testFellowHistoryCard(wrapper);
    expect(props.history.push).not.toBeCalled();
  });

  it('renders fellows page if fellow not found', () => {
    let currentPath = '';
    setup(
      true,
      {
        match: { params: { name: 'Kingsley.Obota' } },
        history: {
          push: url => {
            currentPath = url;
          }
        }
      },
      '/dashboard/fellows/:name'
    );

    expect(currentPath).toEqual('/dashboard/fellows');
  });

  const testManagerByRole = (currentFellow = fellowWithManager) => {
    const { wrapper, props } = setup(
      true,
      {
        history: { push: jest.fn() },
        fellowSummaryDetails: [currentFellow]
      },
      '/dashboard/fellows/:name'
    );

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

  it('sets showDevpulse state to true when the handleCardClick function is called', () => {
    const { wrapper } = setup();
    wrapper.setState({ showDevpulseTable: false });
    const event = {
      currentTarget: { id: 'DevPulse' }
    };
    const instance = wrapper.instance();
    instance.handleCardClick(event);
    expect(wrapper.state().showDevpulseTable).toBe(true);
  });
  it('sets showDevpulseTable state to false and showLmsTable to true state when the handleCardClick function is called', () => {
    const { wrapper } = setup();
    wrapper.setState({ showDevpulseTable: true, showLmsTable: false });
    const event = {
      currentTarget: { id: 'LMS' }
    };
    const instance = wrapper.instance();
    instance.handleCardClick(event);
    expect(wrapper.state().showDevpulseTable).toBe(false);
    expect(wrapper.state().showLmsTable).toBe(true);
  });

  it('renders the PipActivationForm when button is clicked', () => {
    const { wrapper, props } = setup(
      true,
      {
        history: { push: jest.fn() },
        fellowSummaryDetails: []
      },
      '/dashboard/fellows/:name'
    );
    const fellowHistoryWrapper = wrapper.find(FellowHistory).instance();
    fellowHistoryWrapper.setState({ fellow });
    fellowHistoryWrapper.renderPipActivationForm();
    expect(props.history.push).toHaveBeenCalled();
  });
});

