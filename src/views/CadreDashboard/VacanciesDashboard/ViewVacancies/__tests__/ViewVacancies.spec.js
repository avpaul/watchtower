import React from 'react';
import { shallow } from 'enzyme';
import ViewVacancies from '../ViewVacancies';

describe('Vacancy Dashboard', () => {
  const vacanciesToDisplay = "project";
  const allVacancies = [
    {
      project: {
        id: 7,
        name: 'Corrupti non.'
      },
      role: {
        id: 1,
        name: 'Engineer'
      },
      vacancies: [
        {
          id: 99,
          project_id: 7,
          project_role_id: 1,
          fellow_id: null,
          is_active: false
        },

        {
          id: 105,
          project_id: 7,
          project_role_id: 1,
          fellow_id: null,
          is_active: false
        }
      ],
      available_slots: 2
    }
  ];
  /**
   * Creates an enzyme instance to test the VacancyDashboard component.
   *
   * @param propOverrides Used to edit the props passed to the component when being mounted
   * @returns { wrapper, props }
   */
  const setup = (vacancies, toDisplay) => {
    const wrapper = shallow(<ViewVacancies vacancies={vacancies} vacanciesToDisplay={toDisplay} />);
    return { wrapper };
  };

  it('renders correctly', () => {
    const { wrapper } = setup(allVacancies, vacanciesToDisplay);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders no vacancies when array is empty', () => {
    const { wrapper } = setup([]);
    expect(wrapper).toMatchSnapshot();
  });
});
