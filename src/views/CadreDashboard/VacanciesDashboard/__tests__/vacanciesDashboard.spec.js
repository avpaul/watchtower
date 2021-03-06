import React from 'react';
import { MemoryRouter } from 'react-router';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import Thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';
import initialState from '../../../../redux/reducers/initialState';
import VacancyDashboard from '../VacanciesDashboard';
import { generateVacancyGroups } from '../../../../__mocks__/projectVacancy';

describe('Vacancy Dashboard', () => {
  const defaultProps = {
    getAllVacanciesAction: jest.fn(),
    getAllVacancies: {
      data: generateVacancyGroups(2, 2)
    },
    setProjectVacanciesOnFocus: jest.fn(),
    cadreVacanciesWithNoCycleId: {
      data: []
    },
    getAllVacanciesWithNoCycleId: jest.fn(),
    location: {}
  };

  /**
   * Creates an enzyme instance to test the VacancyDashboard component.
   *
   * @param propOverrides Used to edit the props passed to the component when being mounted
   * @returns { wrapper, props }
   */
  const setup = (propOverrides = {}, isMounted = false) => {
    const mockStore = configureStore([Thunk]);
    const store = mockStore(initialState);
    const newProps = { ...defaultProps, ...propOverrides };

    const wrapper = isMounted
      ? mount(
          <Provider store={store}>
            <MemoryRouter keyLength={0} >
              <VacancyDashboard {...newProps} />
            </MemoryRouter>
          </Provider>
        )
      : shallow(
          <MemoryRouter keyLength={0} >
            <VacancyDashboard {...newProps} />
          </MemoryRouter>
        );
    return { wrapper };
  };

  it('renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should be able to click the add project vacancies button', () => {
    const { wrapper } = setup({}, true);
    wrapper.find('#cadre-button-add-vacancies').simulate('click');
    expect(defaultProps.setProjectVacanciesOnFocus).toHaveBeenCalledTimes(1);
  });
});
