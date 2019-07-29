import React from 'react';
import { shallow } from 'enzyme';
import PaginatedVacanciesDashboard, {
  ViewRoleVacancies
} from '../ViewVacancies';

import mockPaginationWrapper from '../../../../../components/Pagination/mockPaginationWrapper';

describe('Vacancy Dashboard', () => {
  const allVacancies = {
    projectVacancies: [
      {
        project: {
          id: 1,
          name: 'A et.'
        },
        role: {
          id: 6,
          name: 'FPC',
          description: 'Neque aut modi minima dolorem quia itaque.',
          active_engineers: []
        },
        vacancies: [
          {
            id: 1,
            project_id: 1,
            project_role_id: 6,
            fellow_id: null,
            is_active: false,
            project: {
              id: 1,
              name: 'A et.'
            },
            role: {
              id: 6,
              name: 'FPC',
              description: 'Neque aut modi minima dolorem quia itaque.',
              active_engineers: []
            }
          }
        ],
        available_slots: 1
      }
    ],
    certificationVacancies: [
      {
        certification: {
          id: 1,
          name: 'Lyric Strosin',
          description: 'Ut aut et incidunt officiis repudiandae temporibus.',
          exclusive: true,
          duration: 20,
          '0': {
            id: 2,
            certification_id: 1,
            fellow_id: null,
            is_active: false,
            created_at: '2019-07-11 06:54:50',
            updated_at: '2019-07-11 06:54:50',
            certification: {
              id: 1,
              name: 'Lyric Strosin',
              description: 'Ut aut et incidunt temporibus.',
              exclusive: true,
              duration: 20
            }
          }
        },
        available_slots: 2
      }
    ]
  };

  /**
   * Creates an enzyme instance to test the VacancyDashboard component.
   *
   * @param propOverrides Used to edit the props passed to the component when being mounted
   * @returns { wrapper, props }
   */
  const setup = (vacancies, paginated = false) => {
    const wrapper = paginated
      ? shallow(
          <PaginatedVacanciesDashboard
            component={
              <ViewRoleVacancies
                vacancies={vacancies}
                paginationWrapper={mockPaginationWrapper}
              />
            }
          />
        )
      : shallow(
          <ViewRoleVacancies
            vacancies={vacancies}
            paginationWrapper={mockPaginationWrapper}
          />
        );

    return { wrapper };
  };

  it('renders correctly', () => {
    const { wrapper } = setup(allVacancies);
    expect(wrapper).toMatchSnapshot();
  });

  it('render paginated view correctly', () => {
    const { wrapper } = setup(allVacancies, true);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders no vacancies when array is empty', () => {
    const { wrapper } = setup([]);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders toogles vacancies to display certification', () => {
    const { wrapper } = setup(allVacancies, false);
    wrapper.setState({ vacanciesToDisplay: 'project' });
    wrapper.find('#certification-button').simulate('click', {
      target: {
        value: 'certification'
      }
    });
    expect(wrapper.state('vacanciesToDisplay')).toEqual('certification');
  });

  it('renders toogles vacancies to display projects', () => {
    const { wrapper } = setup(allVacancies, false);
    wrapper.setState({ vacanciesToDisplay: 'certification' });
    wrapper.find('#project-button').simulate('click', {
      target: {
        value: 'project'
      }
    });
    expect(wrapper.state('vacanciesToDisplay')).toEqual('project');
  });

  it('renders search text input', () => {
    const { wrapper } = setup(allVacancies, false);
    wrapper.setState({ vacanciesToDisplay: 'project' });

    expect(wrapper.find('.vacancy-search-input').type()).toEqual('input');
  });

  it('renders certification search text input', () => {
    const { wrapper } = setup(allVacancies, false);
    wrapper.setState({ vacanciesToDisplay: 'project' });
    const textInput = wrapper.find('.vacancy-search-input');
    textInput.simulate('change', { target: { value: 'My Project' } });

    expect(wrapper.exists('.ops-vacancies__container')).toEqual(false);
  });

  it('renders project search text input', () => {
    const { wrapper } = setup(allVacancies, false);
    wrapper.setState({ vacanciesToDisplay: 'certification' });
    const textInput = wrapper.find('.vacancy-search-input');
    textInput.simulate('change', { target: { value: 'My Certification' } });

    expect(textInput.exists()).toEqual(true);
    expect(wrapper.exists('.ops-no-vacancies')).toEqual(true);
  });
});
