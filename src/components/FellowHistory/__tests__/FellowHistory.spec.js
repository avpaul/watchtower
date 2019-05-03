import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import { FellowHistory } from '../FellowHistory';

describe('Fellow History Container', () => {
  const fellow = {
    id: 10,
    picture: null,
    project: 'Watch Tower',
    status: 'offtack',
    email: 'kingsley.obot@andela.com',
    user: {
      firstName: 'Kingsley',
      lastName: 'Obot'
    },
    fellow_id: '-LQcqbQzyNpIlfJreeiZ'
  };

  const fellowDetails = {
    fellow_id: '-LQcqbQzyNpIlfJreeiZ',
    current_week: null,
    manager_id: '-LGy4OuPDHCZCZvDuPz0',
    project: 'Watch Tower',
    picture: 'https://lorempixel.com/100/100/people/?29579',
    bio:
      'Sed quo voluptatum ducimus sunt labore eos totam. Sit corporis est voluptates commodi occaecati. Modi harum assumenda quod voluptatem.',
    cohort: 'Class 13 - KLA',
    details: {
      apprenticeshipTeam: 'Watch Tower',
      apprenticeshipManager: 'Trust Birungi',
      actualApprenticeshipStartDate: '2019-03-18',
      actualSimulationsCompletionDate: '2019-03-15',
      simulationsPM: 'David Buyinza'
    },
    email: 'stanton.rogahn@andela.com',
    level: 'D0B',
    lms: {
      id: 36,
      fellow_id: '-LQcqbQzyNpIlfJreeiZ',
      submitted: 4,
      total: 16,
      unsubmitted: 12
    },
    lms_id: 1956,
    lms_submissions: [{}],
    location: 'Kampala',
    manager: {
      staff_id: '-LGy4OuPDHCZCZvDuPz0',
      name: 'Trust  Birungi',
      email: 'trust.birungi@andela.com',
      role: 'TTL',
      manager_id: '-KXGy1MT1oimjQgFim9C'
    },
    name: 'Stanton Rogahn',
    pulse: null,
    ratings: [],
    start_date: '2018-12-03',
    status: null
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
      match: { params: { name: 'kingsley.obot', id: '-LQcqbQzyNpIlfJreeiZ' } },
      fellowSummaryDetails: [fellow],
      getLmsSubmissions: jest.fn(),
      lmsSubmissions: {},
      lmsLoading: false,
      ratings: [{}],
      ratingsLoading: false,
      fellowDetailsLoading: false,
      getFellowDevPulse: jest.fn(),
      history: { push: jest.fn() },
      averageRatings: {
        quality: '0.1',
        quantity: '0.41',
        initiative: '0.33',
        communication: '0.00',
        professionalism: '0.00',
        integration: '0.00'
      },
      getFellow: jest.fn(),
      fellowDetails
    };

    props = { ...props, ...propOverrides };

    const wrapper = mountComponent
      ? mount(
          <MemoryRouter keyLength={0} initialEntries={[urlPath]}>
            <FellowHistory {...props} />
          </MemoryRouter>
        )
      : shallow(<FellowHistory {...props} />);

    return { props, wrapper };
  };

  /**
   ** A reusable function used to test the rendering of the manager history card
   * @function
   * @param manager The expected user's (TTL/LF) details that override the default manager details.
   */
  const testManagerByRole = (manager = {}) => {
    const currentFellow = fellowWithManager;
    currentFellow.manager = { ...fellowWithManager.manager, ...manager };
    const { props } = setup(
      true,
      { fellowSummaryDetails: [currentFellow] },
      '/developers/:name'
    );
    expect(props.history.push).not.toBeCalled();
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
        fellowSummaryDetails: [],
        match: {
          params: { name: 'Kingsley.Obota', id: '-LP6C8U9vaZuCUteSlXq' }
        }
      },
      '/developers/:name'
    );
    const action = jest.spyOn(
      wrapper.find(FellowHistory).instance(),
      'setFellow'
    );

    wrapper.setProps({ fellowSummaryDetails: [fellowDetails] }, () => {
      setTimeout(() => {
        expect(props.history.push).toBeCalledWith('/developers');
        expect(action).toBeCalled();
      }, 100);
    });
  });

  it('renders the expected fellow profile details', () => {
    const newFellow = {
      ...fellow,
      devPulseAverage: '2',
      lmsOutput: '17/18'
    };

    const { props } = setup(
      true,
      { fellowSummaryDetails: [newFellow] },
      '/developers/:name'
    );
    expect(props.history.push).not.toBeCalled();
  });

  it('renders fellows page if fellow not found', () => {
    let currentPath = '';
    setup(
      true,
      {
        match: {
          params: { name: 'Kingsley.Obota', id: '-LP6C8U9vaZuCUteSlXq' }
        },
        history: {
          push: url => {
            currentPath = url;
          }
        }
      },
      '/developers/:name'
    );

    expect(currentPath).toEqual('/developers');
  });

  it('renders the expected TTL details', () => {
    testManagerByRole();
  });

  it('renders the expected LF details', () => {
    testManagerByRole({
      roleId: 3,
      detail: `${fellow.user.firstName}'s LF`
    });
  });

  it('renders the expected manager details with an undefined role', () => {
    testManagerByRole({
      roleId: 99,
      detail: `${fellow.user.firstName}'s Undefined`
    });
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
      '/developers/:name'
    );
    const fellowHistoryWrapper = wrapper.find(FellowHistory).instance();
    fellowHistoryWrapper.setState({ fellow });
    fellowHistoryWrapper.renderPipActivationForm();
    expect(props.history.push).toHaveBeenCalled();
  });
});