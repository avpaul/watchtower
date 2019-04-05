/* eslint no-param-reassign: 0 */
import React from 'react';
import { shallow } from 'enzyme';

import LMSProgressSummary from '../LMSProgressSummary';
import LMSChart from '../LMSChart';

describe('LMSChart component', () => {
  let wrapper;
  const lmsSubmission = {
    id: 55891,
    lms_id: 1471,
    fellow_id: '-LJK1qECFdekucrwqqkh',
    assignment_id: 1704,
    course_id: 202,
    graded_at: '2019-03-04',
    submitted_at: '2019-01-11 15:01:19',
    score: 2,
    status: 'graded',
    attempts: 1,
    late: false,
    due_date: '2019-01-11',
    level: 'D0B',
    missing: false,
    assignment: {
      id: 1704,
      name: 'Output 4.1: Drawing the System Design of your Product',
      course_id: 202
    }
  };

  beforeAll(() => {
    const props = {
      fellow: {
        fellow: {
          lms: {
            submitted: 4,
            satisfied: 4
          },
          lms_submissions: [
            lmsSubmission,
            lmsSubmission,
            lmsSubmission,
            lmsSubmission
          ]
        },
        loading: false
      }
    };
    wrapper = shallow(<LMSProgressSummary {...props} />);
  });

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders LMS Progress Summary Chart', () => {
    expect(wrapper.find(LMSChart)).toBeDefined();
  });
});
