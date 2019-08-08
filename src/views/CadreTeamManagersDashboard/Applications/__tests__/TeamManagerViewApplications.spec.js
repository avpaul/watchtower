import React from 'react';
import { mount } from 'enzyme';
import Applications from '../Applications';

let props;
let wrapper;

describe('Test team manager view applications', () => {
  it('should map display project instances properly', () => {
    props = {
      applications: {
        data: {
          pending: [
            {
              id: 16,
              role: {
                "id": 5,
                "name": "Data Engineer",
                "description": "Inventore eveniet sunt molestias reprehenderit.,Est culpa minima quod veritatis laudantium soluta suscipit.",
                "deleted_at": null,
                "duration": 3
              },
              project: {
                "id": 4,
                "name": "Omnis voluptatem quos."
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
          ],
          accepted: [],
          rejected: []
        }
      },
      fetchApplications: jest.fn()
    };
    wrapper = mount(<Applications {...props} />);
  });
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
