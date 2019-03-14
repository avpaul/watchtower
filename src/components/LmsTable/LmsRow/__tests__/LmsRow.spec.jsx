import React from 'react';
import { shallow } from 'enzyme';
import LmsRow from '../LmsRow';

describe('tests the LmsRow', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      lmsSubmission: {
        name: 'test course',
        course_id: 132,
        due_date: '02/03/19',
        submission_date: '02/03/19',
        graded_date: '02/03/19',
        score: 2
      }
    };
    wrapper = shallow(<LmsRow {...props} />);
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
