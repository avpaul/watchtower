import React from 'react';
import { shallow, mount } from 'enzyme';
import FeedbackDashboardPaginationWrapped, {
  FeedbackDashboard,
  PaginationWrapped
} from '../FeedbackDashboard';
import FeedbackDashboardTable from '../FeedbackDashboardTable';
import feedbackArrayMock from '../../../__mocks__/feedbackSummary.json';
import ActionButton from '../../../components/ActionButton';
import FeedbackDuration from '../../../components/FeedbackDuration';
import MapFeedbackFilterCard from '../../../components/MapFeedbackFilterCard';
import FellowFilterCard from '../../../components/FellowFilterCard';
import FellowsCount from '../../../components/FellowsCount';
import mockPaginationWrapper from '../../../components/Pagination/mockPaginationWrapper';

const props = {
  getManagerFeedback: jest.fn(() =>
    Promise.resolve({
      error: true,
      managersFeedback: feedbackArrayMock
    })
  ),
  fellowFeedback: jest.fn(),
  user: {
    roles: { WATCH_TOWER_OPS: '-l1ujhfhjbshwjrn' },
    email: 'wt-test-ops@andela.com'
  },
  currentRole: 'WATCH_TOWER_OPS',
  role: 'WATCH_TOWER_OPS',
  history: {
    push: jest.fn()
  }
};

/**
 * @description Creates an enzyme instance to test the Feedback Dashboard Page component.
 * @param mountComponent Renders a mounted enzyme wrapper if set to true
 * @param propOverrides Used to edit the props passed to the component when being mounted
 *
 * @returns { object } { props, feedbackDashboardWrapper }
 */
const setup = (mountComponent = false, propsOverrides = {}) => {
  const newProps = { ...props, ...propsOverrides };

  const feedbackDashboardWrapper = mountComponent
    ? mount(<FeedbackDashboardPaginationWrapped {...newProps} />)
    : shallow(
        <FeedbackDashboard
          {...newProps}
          paginationWrapper={mockPaginationWrapper}
        />
      );

  return { feedbackDashboardWrapper, props: newProps };
};

describe('Test Feedback Dashboard', () => {
  it('should render the feedback pagination wrapped component', () => {
    const paginatedWrapped = shallow(
      <PaginationWrapped component={<FeedbackDashboard {...props} />} />
    );
    expect(paginatedWrapped).toMatchSnapshot();
  });
  it('should render feedback dashboard without crashing', () => {
    const { feedbackDashboardWrapper } = setup(false, {
      user: { roles: 'WATCH_TOWER_LF' },
      role: 'WATCH_TOWER_LF'
    });
    feedbackDashboardWrapper.setState(
      {
        startDate: '2019-03-10',
        endDate: '2019-3-15',
        currentDate: '2019-3-15'
      },
      () => {
        expect(feedbackDashboardWrapper).toMatchSnapshot();
      }
    );
  });

  it('should set status to all fellows  when a all-fellows card is clicked', () => {
    const { feedbackDashboardWrapper } = setup(false, {
      user: { roles: 'WATCH_TOWER_LF' },
      role: 'WATCH_TOWER_LF'
    });
    feedbackDashboardWrapper.setState({
      feedbackArray: feedbackArrayMock,
      filteredFeedbackData: feedbackArrayMock,
      isTicked: {
        level: 'All Levels',
        type: 'Pre-PIP & PIP',
        criteria: 'All Criteria',
        project: 'All Projects'
      }
    });
    feedbackDashboardWrapper
      .find(MapFeedbackFilterCard)
      .at(1)
      .dive()
      .find(FellowFilterCard)
      .first()
      .dive()
      .simulate('click', {
        currentTarget: {
          id: 'LMS',
          attributes: [{}, {}, { value: 'criteria' }]
        }
      });
    expect(feedbackDashboardWrapper.state('isTicked')).toEqual({
      level: 'All Levels',
      type: 'Pre-PIP & PIP',
      criteria: 'LMS',
      project: 'All Projects'
    });
    expect(
      feedbackDashboardWrapper.state('filteredFeedbackData').length
    ).toEqual(2);
  });

  it('should simulate click on the clear duration', () => {
    const { feedbackDashboardWrapper } = setup(false, {
      user: { roles: 'WATCH_TOWER_LF' },
      role: 'WATCH_TOWER_LF'
    });
    feedbackDashboardWrapper
      .find(FeedbackDuration)
      .dive()
      .find(ActionButton)
      .dive()
      .find('button')
      .simulate('click');
  });

  it('handleStartDateChange and handlEndDateChange should be called', () => {
    const { feedbackDashboardWrapper } = setup(false, {
      user: { roles: 'WATCH_TOWER_LF' },
      role: 'WATCH_TOWER_LF'
    });
    feedbackDashboardWrapper.setState({
      feedbackArray: feedbackArrayMock,
      filteredFeedbackData: feedbackArrayMock,
      isTicked: {
        level: 'All Levels',
        type: 'Pre-PIP & PIP',
        criteria: 'All Criteria',
        project: 'All Projects'
      }
    });
    const startDate = '2019-03-05';
    const endDate = '2019-03-15';
    feedbackDashboardWrapper.instance().handleStartDateChange(startDate);
    feedbackDashboardWrapper.instance().handleEndDateChange(endDate);
    expect(feedbackDashboardWrapper.state('startDate')).toEqual(startDate);
    expect(feedbackDashboardWrapper.state('endDate')).toEqual(endDate);
    feedbackDashboardWrapper.instance().handleStartDateChange('2019-03-18');
    expect(feedbackDashboardWrapper.state('startDate')).toEqual('2019-03-18');
  });

  it('renders FeedbackDashboard Table shallow rendering', () => {
    const { feedbackDashboardWrapper } = setup();
    feedbackDashboardWrapper.setState({
      startDate: '2019-03-18',
      endDate: '2019-04-15',
      currentDate: '2019-03-18'
    });
    expect(
      feedbackDashboardWrapper
        .find(FeedbackDashboardTable)
        .dive()
        .find('Table')
    ).toBeDefined();
  });

  it('calls the handleViewClick method', () => {
    const { feedbackDashboardWrapper } = setup();
    feedbackDashboardWrapper.setState({
      feedbackArray: [
        { attribute: '' },
        {
          attribute: 'data',
          name: 'Random name',
          fellow_id: '-LU5ayJwwvcPATT1akh5'
        }
      ]
    });
    feedbackDashboardWrapper.setProps({
      history: [],
      fellowFeedback: jest.fn(),
      paginationWrapper: {
        ...mockPaginationWrapper,
        state: {
          ...mockPaginationWrapper.state,
          paginatedData: [
            {
              attribute: '',
              context: 'Hi Sinmiloluwa',
              criteria: 'lms',
              name: 'Sinmiloluwa Oloyede',
              manager:
                '{"staff_id":"-LU5ayJwwvcPATT1akh5","name":"Olaolu Akinsete","email":"olaolu.akinsete@andela.com","role":"TTL","manager_id":"-KXGy1MT1oimjQgFim8t"}',
              recommendation: null,
              fellow_id: '-LU5ayJwwvcPATT1akh5',
              start_date: '2019-05-07 11:40:55'
            },
            {
              attribute: '',
              context: 'Hi Sinmiloluwa',
              criteria: 'lms',
              name: 'Sinmiloluwa Oloyede',
              manager:
                '{"staff_id":"-LU5ayJwwvcPATT1akh5","name":"Olaolu Akinsete","email":"olaolu.akinsete@andela.com","role":"TTL","manager_id":"-KXGy1MT1oimjQgFim8t"}',
              recommendation: null,
              fellow_id: '-LU5ayJwwvcPATT1akh5',
              start_date: '2019-05-07 11:40:55'
            }
          ]
        }
      }
    });
    // create custom event
    const event = Object.assign(jest.fn(), {
      preventDefault: () => {},
      target: {
        getAttribute: x => (x === 'data-key' ? 1 : 0),
        tagName: 'A'
      }
    });
    feedbackDashboardWrapper.instance().handleViewClick(event);
  });

  it('calls the handleViewClick method when the image is clicked', () => {
    const { feedbackDashboardWrapper } = setup();
    feedbackDashboardWrapper.setState({
      feedbackArray: [
        { attribute: '' },
        {
          attribute: 'data',
          name: 'Random name',
          fellow_id: '-LU5ayJwwvcPATT1akh5'
        }
      ]
    });
    feedbackDashboardWrapper.setProps({
      history: [],
      fellowFeedback: jest.fn(),
      paginationWrapper: {
        ...mockPaginationWrapper,
        state: {
          ...mockPaginationWrapper.state,
          paginatedData: [
            {
              attribute: '',
              context: 'Hi Sinmiloluwa',
              criteria: 'lms',
              name: 'Sinmiloluwa Oloyede',
              manager:
                '{"staff_id":"-LU5ayJwwvcPATT1akh5","name":"Olaolu Akinsete","email":"olaolu.akinsete@andela.com","role":"TTL","manager_id":"-KXGy1MT1oimjQgFim8t"}',
              recommendation: null,
              fellow_id: '-LU5ayJwwvcPATT1akh5',
              start_date: '2019-05-07 11:40:55'
            },
            {
              attribute: '',
              context: 'Hi Sinmiloluwa',
              criteria: 'lms',
              name: 'Sinmiloluwa Oloyede',
              manager:
                '{"staff_id":"-LU5ayJwwvcPATT1akh5","name":"Olaolu Akinsete","email":"olaolu.akinsete@andela.com","role":"TTL","manager_id":"-KXGy1MT1oimjQgFim8t"}',
              recommendation: null,
              fellow_id: '-LU5ayJwwvcPATT1akh5',
              start_date: '2019-05-07 11:40:55'
            }
          ]
        }
      }
    });
    // create custom event
    const event = Object.assign(jest.fn(), {
      preventDefault: () => {},
      target: {
        parentElement: { getAttribute: x => (x === 'data-key' ? 1 : 0) },
        tagName: 'IMG'
      }
    });
    feedbackDashboardWrapper.instance().handleViewClick(event);
  });

  it('renders FeedbackDashboard Table full mount rendering', () => {
    props.getManagerFeedback = jest.fn(() =>
      Promise.resolve({
        error: false,
        managersFeedback: feedbackArrayMock
      })
    );
    const { feedbackDashboardWrapper } = setup(false, props);
    expect(
      feedbackDashboardWrapper
        .find(FeedbackDashboardTable)
        .dive()
        .find('Table')
    ).toBeDefined();
    expect(props.getManagerFeedback).toBeCalled();
  });

  it('should clear filtered table of fellows', () => {
    const feedbackDashboardWrapper = mount(
      <FeedbackDashboard {...props} paginationWrapper={mockPaginationWrapper} />
    );

    const button = feedbackDashboardWrapper.find('.clear-filters');

    button.simulate('click');
    expect(feedbackDashboardWrapper.state().isTicked).toEqual({
      level: 'All Levels',
      type: 'Pre-PIP & PIP',
      manager_email: 'All LFs',
      criteria: 'All Criteria',
      project: 'All Projects'
    });
  });
});

describe('Feedback simslead and engineering dashboard tests', () => {
  const managersFeedback = [
    {
      firstName: 'Bukola',
      lastName: 'Makinwa',
      email: 'bukola.makinwa@andela.com',
      roleId: 4,
      staffId: '-KXGy1MT1oimjQgFim9C',
      id: 1,
      createdAt: '2019-03-25 15:20:30',
      updatedAt: '2019-03-25 15:20:30'
    }
  ];

  const stateFOrEMSLTests = {
    feedbackArray: feedbackArrayMock,
    filteredFeedbackData: feedbackArrayMock,
    isTicked: {
      level: 'All Levels',
      type: 'Pre-PIP & PIP',
      criteria: 'All Criteria',
      project: 'All Projects',
      manager_email: 'All LFs'
    },
    startDate: '2019-03-10',
    endDate: '2019-3-15',
    currentDate: '2019-3-15'
  };

  const setupForEMSLTests = (user, role, fellowManager) => {
    const newProps = {
      user,
      role,
      getManagerFeedback: jest.fn().mockImplementation(() =>
        Promise.resolve({
          error: false,
          managersFeedback: {
            ...managersFeedback,
            [`${fellowManager.role}`]: [
              {
                firstName: fellowManager.firstName,
                lastName: fellowManager.lastName,
                email: fellowManager.email,
                roleId: 2,
                id: 2,
                staffId: '-KXGy1MT1oimjQgFim8t',
                createdAt: '2019-03-25 15:20:31',
                updatedAt: '2019-03-25 15:20:31',
                managerId: '-KXGy1MT1oimjQgFim9C',
                feedback: feedbackArrayMock
              }
            ]
          }
        })
      )
    };

    const { feedbackDashboardWrapper } = setup(false, newProps);
    feedbackDashboardWrapper.setState(stateFOrEMSLTests);
    return { feedbackDashboardWrapper };
  };

  it('should render feedback dashboard  when simslead is logged in without crashing', () => {
    const { feedbackDashboardWrapper } = setupForEMSLTests(
      {
        roles: { WATCH_TOWER_EM: '44343243' },
        email: 'bukola.makinwa@andela.com'
      },
      'WATCH_TOWER_EM',
      {
        role: 'ttls',
        email: 'trust.birungi@andela.com',
        firstName: 'Trust',
        lastName: 'Birungi'
      }
    );

    expect(feedbackDashboardWrapper).toMatchSnapshot();
  });

  it('should render 4 total filtered feedback when feedback dashboard mounts', () => {
    const { feedbackDashboardWrapper } = setupForEMSLTests(
      {
        roles: { WATCH_TOWER_EM: '44343243' },
        email: 'bukola.makinwa@andela.com'
      },
      'WATCH_TOWER_EM',
      {
        role: 'ttls',
        email: 'trust.birungi@andela.com',
        firstName: 'Trust',
        lastName: 'Birungi'
      }
    );
    expect(feedbackDashboardWrapper.find(FellowsCount).props().count).toBe(4);
  });

  it('should set manager_email to a particular TTL  when a a TTL card is clicked', () => {
    const { feedbackDashboardWrapper } = setupForEMSLTests(
      {
        roles: { WATCH_TOWER_EM: '44343243' },
        email: 'bukola.makinwa@andela.com'
      },
      'WATCH_TOWER_EM',
      {
        role: 'ttls',
        email: 'trust.birungi@andela.com',
        firstName: 'Trust',
        lastName: 'Birungi'
      }
    );
    feedbackDashboardWrapper.setState({
      feedbackArray: feedbackArrayMock,
      filteredFeedbackData: feedbackArrayMock,
      isTicked: {
        level: 'All Levels',
        type: 'Pre-PIP & PIP',
        criteria: 'All Criteria',
        project: 'All Projects',
        manager_email: 'All TTLs'
      }
    });
    feedbackDashboardWrapper
      .find(MapFeedbackFilterCard)
      .at(1)
      .dive()
      .find(FellowFilterCard)
      .first()
      .dive()
      .simulate('click', {
        currentTarget: {
          id: 'Trust Birungi',
          attributes: [{}, {}, { value: 'manager_email' }]
        }
      });
    expect(feedbackDashboardWrapper.state('isTicked')).toEqual({
      level: 'All Levels',
      type: 'Pre-PIP & PIP',
      criteria: 'All Criteria',
      project: 'All Projects',
      manager_email: 'Trust Birungi'
    });
    expect(
      feedbackDashboardWrapper.state('filteredFeedbackData').length
    ).toEqual(4);
  });

  it('should render feedback dashboard  when simslead is logged in without crashing', () => {
    const { feedbackDashboardWrapper } = setupForEMSLTests(
      {
        roles: { WATCH_TOWER_SL: '44343243' },
        email: 'ngbinu.muwra@andela.com'
      },
      'WATCH_TOWER_SL',
      {
        role: 'lfs',
        email: 'ephraim.malinga@andela.com',
        firstName: 'Ephraim',
        lastName: 'Malinga'
      }
    );
    expect(feedbackDashboardWrapper).toMatchSnapshot();
  });
});
