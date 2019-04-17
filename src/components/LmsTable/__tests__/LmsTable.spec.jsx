import React from 'react';
import { shallow } from 'enzyme';
import LmsTable from '../LmsTable';

describe('tests the LmsTable', () => {
  let wrapper;
  let wrapper2;
  let wrapper3;
  beforeEach(() => {
    const props = {
      lmsSubmissions: [],
      loading: true
    };
    const props2 = {
      lmsSubmissions: [],
      loading: false
    };

    const props3 = {
      lmsSubmissions: [
        {
          assignment: {
            course_id: 282,
            id: 2465,
            name: 'Output 3.2: Communicating Proactively'
          },
          course_id: 282,
          due_date: '2019-03-29',
          graded_at: null,
          score: null,
          submitted_at: '2019-03-29 14:47:04'
        }
      ],
      loading: true
    };

    wrapper = shallow(<LmsTable {...props} />);
    wrapper2 = shallow(<LmsTable {...props2} />);
    wrapper3 = shallow(<LmsTable {...props3} />);
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('renders correctly', () => {
    expect(wrapper2).toMatchSnapshot();
  });
  it('renders correctly', () => {
    expect(wrapper3).toMatchSnapshot();
  });
});
