import React from 'react';
import { shallow } from 'enzyme';
import LmsRow from '../LmsRow';

describe('tests the LmsRow', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      lmsSubmission: {
        assignment: { name: 'test course' },
        course_id: 132,
        due_date: '2018-12-14T13:59:00Z',
        submitted_at: '2018-12-14T13:59:00Z',
        graded_at: '2018-12-14T13:59:00Z',
        score: 2
      }
    };
    wrapper = shallow(<LmsRow {...props} />);
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
