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
    name: 'Kingsley Obot',
    overall_status: 'onTrack',
    overall_average: 1,
    total: 16,
    submitted: 16,
    apprenticeshipTeam: 'Watch Tower',
    managerName: 'Kesiena Akpobome',
    managerEmail: 'kesiena.akpobome@andela.com',
    managerRole: 'TTL'
  };

  const fellow1 = {
    id: 10,
    picture: null,
    project: 'Watch Tower',
    email: 'kingsley.obot@andela.com',
    name: 'Kingsley Obot',
    overall_status: 'N/A'
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
      lmsSubmissions: [
        {
          assignment: {
            id: 2465,
            name: 'Output 3.2: Communicating Proactively',
            course_id: 282
          },
          course_id: 282,
          due_date: '2019-02-22',
          fellow_id: '-LLUWWd2rDslm51iDJzh',
          graded_at: '2019-02-22',
          level: 'D0B',
          score: 2,
          submitted_at: '2019-02-22 14:20:52'
        }
      ],
      lmsLoading: false,
      ratings: [
        {
          scores: [
            {
              attribute: 'Quantity',
              score: 1
            },
            {
              attribute: 'Quality',
              score: 2
            },
            {
              attribute: 'Initiative',
              score: 2
            },
            {
              attribute: 'Communication',
              score: 2
            },
            {
              attribute: 'Professionalism',
              score: 0
            },
            {
              attribute: 'Integration',
              score: 0
            }
          ]
        }
      ],
      ratingsLoading: false,
      getFellowHistoryData: jest.fn(),
      history: { push: jest.fn() },
      averageRatings: {
        quality: '0.1',
        quantity: '0.41',
        initiative: '0.33',
        communication: '0.00',
        professionalism: '0.00',
        integration: '0.00'
      }
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
   ** A reusable function used to test the fellow history card for the expected details
   * @function
   * @param wrapper The enzyme instance used to query for the specific dom elements
   * @param user The expected user's (Fellow/TTL/LF) details.
   */
  const testFellowHistoryCard = (wrapper, user = fellow) => {
    expect(
      wrapper
        .find('.fellow-history-card__name')
        .at(0)
        .text()
    ).toEqual(user.name);
    expect(
      wrapper
        .find('.fellow-history-card__detail')
        .at(0)
        .text()
    ).toEqual(user.apprenticeshipTeam);
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
      '/developers/:name'
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
      ...fellow
    };

    const { wrapper, props } = setup(
      true,
      { fellowSummaryDetails: [newFellow] },
      '/developers/:name'
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
      '/developers/:name'
    );

    expect(currentPath).toEqual('/developers');
  });

  it('renders the expected TTL details', () => {
    const { wrapper } = setup();
    wrapper.instance().renderManagerCard(fellow);
    wrapper.instance().renderManagerCard(null);
    wrapper.instance().mapDisplayslistData(fellow1);
  });

  it('renders the expected LF details', () => {
    const { wrapper } = setup();
    fellow.managerRole = 'LF';
    wrapper.instance().renderManagerCard(fellow);
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
