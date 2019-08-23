import React from 'react';
import { shallow } from 'enzyme';
import TDDOPsVacancyCard from '../TDDOPsVacancyCard';
import vacancyGroupMock from '../../../__mocks__/projectVacancy';

describe('TDD Ops Vacancy card', () => {
  const defaultProps = {
    vacanciesToDisplay: 'project',
    vacancy: vacancyGroupMock,
    setVacanciesOnFocus: jest.fn()
  };

  const certificationVacancyProps = {
    vacanciesToDisplay: 'certification',
    vacancy: {
      certification: {
        id: 1,
        name: 'Wava Wehner MD Certification',
        description: 'Harum sit reiciendis sint delectus aspernatur omnis.,',
        exclusive: true,
        duration: 20
      },
      vacancy_details: {
        id: 2,
        certification_id: 1,
        fellow_id: null,
        is_active: false,
        created_at: '2019-07-10 07:58:34',
        updated_at: '2019-07-10 07:58:34',
        closing_date: '2019-07-10 07:58:34',
        start_date: '2019-08-10 07:58:34',
        certification: {
          id: 1,
          name: 'Wava Wehner MD',
          description: 'Harum sit molestias.',
          exclusive: true,
          duration: 20
        },
        applications: [{ id: 1 }]
      },
      applications: 1,
      available_slots: 2
    }
  };

  /**
   * Creates an enzyme instance to test the VacancyCard component.
   *
   * @param propOverrides Used to edit the props passed to the component when being mounted
   * @returns { wrapper, props }
   */
  const setup = propOverrides => {
    const wrapper = shallow(<TDDOPsVacancyCard {...propOverrides} />);
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

  it('should be able to click on card dropdown options', () => {
    const { wrapper } = setup(defaultProps);
    wrapper.find('.ops-vacancy-card__icon').simulate('click');
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(defaultProps.setVacanciesOnFocus).toHaveBeenCalledTimes(1);
    wrapper
      .find('button')
      .at(1)
      .simulate('click');
    expect(defaultProps.setVacanciesOnFocus).toHaveBeenCalledTimes(2);
  });
});
