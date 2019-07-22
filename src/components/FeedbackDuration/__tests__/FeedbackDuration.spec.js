import React from 'react';
import { shallow } from 'enzyme';
import FeedbackDuration from '../FeedbackDuration';

describe('Test feedbackDuration snapshots', () => {
  const props = {
    startDate: '2019-03-10',
    endDate: '2019-03-15',
    currentDate: '2019-03-15'
  };

  const vacanciesProps = {
    startDate: '2019-03-10',
    endDate: '2019-03-15',
    currentDate: '2019-03-15',
    vacancies: true
  };

  it('feedbackDuration should render properly', () => {
    expect(shallow(<FeedbackDuration {...props} />)).toMatchSnapshot();
  });

  it('feedbackDuration should render properly when vacancies props is passed', () => {
    expect(shallow(<FeedbackDuration {...vacanciesProps} />)).toMatchSnapshot();
  });
});
