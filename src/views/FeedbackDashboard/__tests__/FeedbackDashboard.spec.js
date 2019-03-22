import React from 'react';
import { shallow, mount } from 'enzyme';
import FeedbackDashboard from '../FeedbackDashboard';
import FeedbackDashboardTable from '../FeedbackDashboardTable';
import feedbackArrayMock from '../../../__mocks__/feedbackSummary.json';
import ActionButton from '../../../components/ActionButton';
import FeedbackDuration from '../../../components/FeedbackDuration';
import MapFeedbackFilterCard from '../../../components/MapFeedbackFilterCard';
import FellowFilterCard from '../../../components/FellowFilterCard';

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
      endDate: 1467547453
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
  });
});
