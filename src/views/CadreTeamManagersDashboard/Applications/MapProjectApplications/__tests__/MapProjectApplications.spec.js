import React from 'react';
import { shallow } from 'enzyme';
import MapProjectApplications from '../MapProjectApplications';

const applications = [
  {
    id: 16,
    role: 'QA Engineer',
    project: {
      id: 1,
      name: 'Test Project'
    },
    applicant: {
      id: 9,
      fellow_id: '-HYBHVWK78HBJ',
      first_name: 'Test',
      last_name: 'Applicant',
      picture: 'https://lorempixel.com/100/100/people/?23475 ',
      cohort: 'NBO-11',
      sims_start_date: '2019-02-19 00:00:00'
    }
  }
];
describe('Test MapProjectApplications cards', () => {
  it('should render correctly', () => {
    const props = {
      applications
    };
    const wrapper = shallow(<MapProjectApplications {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
