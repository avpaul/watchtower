import React from 'react';
import { mount } from 'enzyme';
import Applications from '../Applications';
import ApplicationAcceptanceConfirmationModal from '../../../../components/TeamManagerCard/ApplicationAcceptanceConfirmationModal';

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

describe('Application component', () => {
  const defaultProps = {
    fetchApplications: jest.fn(),
    applications
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Applications {...defaultProps} />);
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle fetchSingleApplication after clicking', () => {
    wrapper.setState({
      showApplication: false,
      application: {}
    });

    const findClick = wrapper.find("[data-test='team_manager_card']");
    findClick.simulate('click');
    expect(wrapper.state('showApplication')).toEqual(true);
    expect(wrapper.find('.applicant_button').text()).toBe('ACCEPT');
    expect(findClick.length).toBe(1);
    wrapper.find('.applicant_button').simulate('click');
    expect(wrapper.find(ApplicationAcceptanceConfirmationModal).length).toBe(1);
  });

  it('should handle acceptance button click to show accept modal', () => {
    wrapper.setState({
      showApplication: false,
      application: {}
    });

    const findClick = wrapper.find("[data-test='team_manager_card']");
    findClick.simulate('click');
    wrapper.find('.applicant_button').simulate('click');
    expect(wrapper.find('.accept-btn').length).toBe(1);
    wrapper.find('.accept-btn').simulate('click');
    wrapper.instance().acceptApplicationHandler();
    wrapper.instance().showConfirmationResponse();
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle rejection button click to show rejection modal', () => {
    wrapper.setState({
      showApplication: false,
      application: {}
    });

    const findClick = wrapper.find("[data-test='team_manager_card']");
    findClick.simulate('click');
    wrapper.find('.applicant_button').simulate('click');
    expect(wrapper.find('.reject-btn').length).toBe(1);
    wrapper.find('.reject-btn').simulate('click');
    wrapper.instance().hideConfirmationResponse();
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle filtering after clicking', () => {
    wrapper.setState({
      filteredApplications: [],
      currentRole: 'All Roles'
    });
    const findClick = wrapper.find('.filter-dropdown__button');

    expect(findClick.text()).toBe('All Roles');
    findClick.simulate('click');
    wrapper.instance().filterByRole('All Roles');
    expect(wrapper).toMatchSnapshot();
  });

  it('should show confirmationModal', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
