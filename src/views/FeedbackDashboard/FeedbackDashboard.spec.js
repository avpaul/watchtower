import React from 'react';
import { shallow, mount } from 'enzyme';
import FeedbackDashboard from './FeedbackDashboard';
import FeedbackDashboardTable from './FeedbackDashboardTable';
import feedbackArrayMock from '../../__mocks__/feedbackSummary.json';

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

  it('renders correctly', () => {
    const wrapper = shallow(<FeedbackDashboard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders FeedbackDashboard Table shallow rendering', () => {
    const wrapper = shallow(<FeedbackDashboard {...props} />);
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
