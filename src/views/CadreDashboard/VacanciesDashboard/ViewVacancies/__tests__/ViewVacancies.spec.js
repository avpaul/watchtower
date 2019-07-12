import React from 'react';
import { shallow } from 'enzyme';
import ViewVacancies from '../ViewVacancies';
import { generateVacancyGroups } from '../../../../../__mocks__/projectVacancy';

describe('Vacancy Dashboard', () => {
  const vacanciesToDisplay = "project";
  const allVacancies = generateVacancyGroups(5, 2);

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
