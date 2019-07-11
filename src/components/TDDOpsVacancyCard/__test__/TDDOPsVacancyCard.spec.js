import React from 'react';
import { shallow } from 'enzyme';
import TDDOPsVacancyCard from '../TDDOPsVacancyCard';

describe('Test TDD Ops vacancy card', () => {
  const defaultProps = {
    vacanciesToDisplay: "project",
    vacancy: {
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
  };

  const certificationVacancyProps = {
    vacanciesToDisplay: 'certification',
    vacancy: {
      "certification": {
        "id": 1,
        "name": "Wava Wehner MD",
        "description": "Harum sit reiciendis sint delectus aspernatur omnis.,",
        "exclusive": true,
        "duration": 20,
        "0": {
          "id": 2,
          "certification_id": 1,
          "fellow_id": null,
          "is_active": false,
          "created_at": "2019-07-10 07:58:34",
          "updated_at": "2019-07-10 07:58:34",
          "certification": {
            "id": 1,
            "name": "Wava Wehner MD",
            "description": "Harum sit molestias.",
            "exclusive": true,
            "duration": 20
          }
        }
      },
      "available_slots": 2
    }
  }
  /**
   * Creates an enzyme instance to test the VacancyDashboard component.
   *
   * @param propOverrides Used to edit the props passed to the component when being mounted
   * @returns { wrapper, props }
   */
  const setup = props => {
    const wrapper = shallow(<TDDOPsVacancyCard {...props} />);
    return { wrapper };
  };

  it('renders project vacancy correctly', () => {
    const { wrapper } = setup(defaultProps);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders certification vacancy correctly', () => {
    const { wrapper } = setup(certificationVacancyProps);
    expect(wrapper).toMatchSnapshot();
  });
});
