import React from 'react';
import { shallow, mount } from 'enzyme';
import FeedbackDashboard from '../FeedbackDashboard';
import FeedbackDashboardTable from '../FeedbackDashboardTable';
import feedbackArrayMock from '../../../__mocks__/feedbackSummary.json';
import ActionButton from '../../../components/ActionButton';
import FeedbackDuration from '../../../components/FeedbackDuration';
import MapFeedbackFilterCard from '../../../components/MapFeedbackFilterCard';
import FellowFilterCard from '../../../components/FellowFilterCard';
import FellowsCount from '../../../components/FellowsCount';

describe('Test Feedback Dashboard', () => {
  const props = {
    getManagerFeedback: jest.fn(() =>
      Promise.resolve({
        error: true,
        managersFeedback: feedbackArrayMock
      })
    ),
    user: {
      roles: { WATCH_TOWER_OPS: '-l1ujhfhjbshwjrn' },
      email: 'wt-test-ops@andela.com'
    },
    currentRole: 'WATCH_TOWER_OPS',
    role: 'WATCH_TOWER_OPS'
  };

  it('renders FeedbackDashboard Table shallow rendering', () => {
    const wrapper = shallow(<FeedbackDashboard {...props} />);
    wrapper.setState({
      startDate: 1234564567,
      endDate: 1467547453,
      currentDate: 1234564567
    });
    expect(
      wrapper.find(
        <FeedbackDashboardTable
          feedbackArray={feedbackArrayMock}
          type="pip"
          currentRole="WATCH_TOWER_OPS"
        />
      )
    ).toBeDefined();
  });

  it('renders FeedbackDashboard Table full mount rendering', () => {
    props.getManagerFeedback = jest.fn(() =>
      Promise.resolve({
        error: false,
        managersFeedback: feedbackArrayMock
      })
    );
    const wrapper = mount(<FeedbackDashboard {...props} />);
    expect(
      wrapper.find(
        <FeedbackDashboardTable
          {...props}
          feedbackArray={feedbackArrayMock}
          type="pip"
          currentRole="WATCH_TOWER_OPS"
        />
      )
    ).toBeDefined();
    expect(props.getManagerFeedback).toBeCalledWith(
      props.user.roles,
      props.user.email
    );
  });

  it('should clear filtered table of fellows', () => {
    const wrapper = mount(<FeedbackDashboard {...props} />);

    const button = wrapper.find('.clear-filters');

    button.simulate('click');
    expect(wrapper.state().isTicked).toEqual({
      level: 'All Levels',
      type: 'Pre-PIP & PIP',
      criteria: 'All Criteria',
      project: 'All Projects',
      manager_email: 'All TTLs'
    });
  });
});

describe('FeedbackDashboard tests', () => {
  const setup = (user, role) => {
    const props = {
      user,
      role,
      getManagerFeedback: jest.fn().mockImplementation(() =>
        Promise.resolve({
          error: false,
          managersFeedback: feedbackArrayMock
        })
      )
    };
    const feedbackDashboardWrapper = shallow(<FeedbackDashboard {...props} />);
    return { feedbackDashboardWrapper };
  };

  it('should render feedback dashboard without crashing', () => {
    const { feedbackDashboardWrapper } = setup(
      { roles: 'WATCH_TOWER_LF' },
      'WATCH_TOWER_LF'
    );
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
    const { feedbackDashboardWrapper } = setup(
      { roles: 'WATCH_TOWER_LF' },
      'WATCH_TOWER_LF'
    );
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
    const { feedbackDashboardWrapper } = setup(
      { roles: 'WATCH_TOWER_LF' },
      'WATCH_TOWER_LF'
    );
    feedbackDashboardWrapper
      .find(FeedbackDuration)
      .dive()
      .find(ActionButton)
      .dive()
      .find('button')
      .simulate('click');
  });

  it('handleStartDateChange and handlEndDateChange should be called', () => {
    const { feedbackDashboardWrapper } = setup(
      { roles: 'WATCH_TOWER_LF' },
      'WATCH_TOWER_LF'
    );
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

  it('handlePaginationChange should change page state as expected', () => {
    const { feedbackDashboardWrapper } = setup(
      { roles: 'WATCH_TOWER_LF' },
      'WATCH_TOWER_LF'
    );
    const filters = {
      page: 2,
      perPage: 25,
      totalPages: 0
    };

    feedbackDashboardWrapper.instance().handlePaginationPageChange(filters);
    expect(feedbackDashboardWrapper.state().paginationFilter.page).toBe(2);
  });
});

describe('Feedback simslead and engineering dashboard tests', () => {
  const setup = (user, role, fellowManager) => {
    const props = {
      user,
      role,
      getManagerFeedback: jest.fn().mockImplementation(() =>
        Promise.resolve({
          error: false,
          managersFeedback: [
            {
              firstName: 'Bukola',
              lastName: 'Makinwa',
              email: 'bukola.makinwa@andela.com',
              roleId: 4,
              staffId: '-KXGy1MT1oimjQgFim9C',
              id: 1,
              createdAt: '2019-03-25 15:20:30',
              updatedAt: '2019-03-25 15:20:30',
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
          ]
        })
      )
    };
    const feedbackDashboardWrapper = shallow(<FeedbackDashboard {...props} />);
    feedbackDashboardWrapper.setState({
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
    });
    return { feedbackDashboardWrapper };
  };

  it('should render feedback dashboard  when simslead is logged in without crashing', () => {
    const { feedbackDashboardWrapper } = setup(
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
    const { feedbackDashboardWrapper } = setup(
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
    const { feedbackDashboardWrapper } = setup(
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
    const { feedbackDashboardWrapper } = setup(
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
