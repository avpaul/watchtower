import React from 'react';
import { shallow } from 'enzyme';
import FeedbackDuration from '../FeedbackDuration';

describe('Test feedbackDuration snapshots', () => {
  const props = {
    startDate: '2019-03-10',
    endDate: '2019-03-15',
    currentDate: '2019-03-15'
  };
  it('feedbackDuration should render properly', () => {
    expect(shallow(<FeedbackDuration {...props} />)).toMatchSnapshot();
  });
});
