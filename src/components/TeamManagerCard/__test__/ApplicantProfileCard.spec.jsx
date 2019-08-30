import React from 'react';
import { mount } from 'enzyme';
import ApplicantProfileCard from '../ApplicantProfileCard';
import Applications from '../../../views/CadreTeamManagersDashboard/Applications/Applications';

const applications = {
  data: {
    pending: [
      {
        id: 13,
        fellow_id: '-LSKa7Lv0YJtaXSlGbog',
        project_id: 4,
        project_role_id: 5,
        application_reason:
          'Iure unde rerum nihil dolorum natus nam sit. Quis vitae ab quo voluptates rerum. Voluptas sint error et repellat.',
        project_vacancy_id: null,
        created_at: '2019-08-22 12:23:24',
        updated_at: '2019-08-22 12:23:24',
        decision: 'pending',
        selected: false,
        confirm_email_sent: false,
        status_email_sent: false,
        applicant: {
          id: 1,
          fellow_id: '-LSKa7Lv0YJtaXSlGbog',
          first_name: 'Wasibani',
          last_name: 'Roy',
          email: 'roy.wasibani@andela.com',
          picture: 'https://lorempixel.com/100/100/people/?23475',
          cohort: 'Lagos-7',
          sims_project: 'AuthorsHaven',
          sims_project_technology: 'Python/Go',
          sims_start_date: '2018-11-12 00:00:00',
          sims_end_date: '2019-02-17 00:00:00',
          cadre_start_date: null,
          sims_manager: 'Daniel Ale',
          apprenticeship_project: 'WatchTower',
          apprenticeship_technology: 'Devops',
          apprenticeship_start_date: '2019-06-02 00:00:00',
          apprenticeship_end_date: '2019-06-17 00:00:00',
          apprenticeship_manager: 'Jason Okagbare',
          account_active: false,
          email_sent: false,
          project_id: null,
          project_role_id: null,
          created_at: null,
          updated_at: null
        },
        project: {
          id: 4,
          name: 'Omnis voluptatem quos.'
        },
        role: {
          id: 5,
          name: 'Data Engineer',
          description:
            'Inventore eveniet sunt molestias reprehenderit.,Est culpa minima quod veritatis laudantium soluta suscipit.',
          deleted_at: null,
          duration: 3
        },
        vacancy: { closing_date: '2019-08-27 09:31:14' }
      }
    ]
  },
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
};

describe('tests the Profile card', () => {
  const props = {
    firstName: 'Cristian',
    lastName: 'Bartell',
    picture: 'https://',
    roleName: '',
    projectId: '',
    applicationReason: ''
  };
  const defaultProps = {
    fetchApplications: jest.fn(),
    applications
  };

  it('renders correctly', () => {
    const wrapper = mount(<ApplicantProfileCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Applications {...defaultProps} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should click the x', () => {
    wrapper.setState({
      showApplication: true,
      application: {
        id: 13,
        fellow_id: '-LSKa7Lv0YJtaXSlGbog',
        project_id: 4,
        project_role_id: 5,
        application_reason:
          'Iure unde rerum nihil dolorum natus nam sit. Quis vitae ab quo voluptates rerum. Voluptas sint error et repellat.',
        project_vacancy_id: null,
        created_at: '2019-08-22 12:23:24',
        updated_at: '2019-08-22 12:23:24',
        decision: 'pending',
        selected: false,
        confirm_email_sent: false,
        status_email_sent: false,
        applicant: {
          id: 1,
          fellow_id: '-LSKa7Lv0YJtaXSlGbog',
          first_name: 'Wasibani',
          last_name: 'Roy',
          email: 'roy.wasibani@andela.com',
          picture: 'https://lorempixel.com/100/100/people/?23475',
          cohort: 'Lagos-7',
          sims_project: 'AuthorsHaven',
          sims_project_technology: 'Python/Go',
          sims_start_date: '2018-11-12 00:00:00',
          sims_end_date: '2019-02-17 00:00:00',
          cadre_start_date: null,
          sims_manager: 'Daniel Ale',
          apprenticeship_project: 'WatchTower',
          apprenticeship_technology: 'Devops',
          apprenticeship_start_date: '2019-06-02 00:00:00',
          apprenticeship_end_date: '2019-06-17 00:00:00',
          apprenticeship_manager: 'Jason Okagbare',
          account_active: false,
          email_sent: false,
          project_id: null,
          project_role_id: null,
          created_at: null,
          updated_at: null
        },
        project: {
          id: 4,
          name: 'Omnis voluptatem quos.'
        },
        role: {
          id: 5,
          name: 'Data Engineer',
          description:
            'Inventore eveniet sunt molestias reprehenderit.,Est culpa minima quod veritatis laudantium soluta suscipit.',
          deleted_at: null,
          duration: 3
        },
        vacancy: { closing_date: '2019-08-27 09:31:14' }
      }
    });
    const findClick = wrapper.find("[className='closeApp']");
    expect(findClick.simulate('click').length).toBe(1);
  });
});
