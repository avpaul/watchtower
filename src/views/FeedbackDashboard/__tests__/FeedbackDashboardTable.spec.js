import React from 'react';
import { shallow } from 'enzyme';
import FeedbackDashboardTable from '../FeedbackDashboardTable';
import feedbackArrayMock from '../../../__mocks__/feedbackSummary.json';

describe('FeedbackDashboardTable', () => {
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
    role: 'WATCH_TOWER_OPS',
    feedbackArray: feedbackArrayMock,
    type: 'pip'
  };

  it('should render correctly', () => {
    const wrapper = shallow(
      <FeedbackDashboardTable {...props} feedbackArray={feedbackArrayMock} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly mount rendering', () => {
    const wrapper = shallow(
      <FeedbackDashboardTable
        {...props}
        feedbackArray={feedbackArrayMock}
        type="pre-pip"
      />
    );
    expect(wrapper);
  });
});
