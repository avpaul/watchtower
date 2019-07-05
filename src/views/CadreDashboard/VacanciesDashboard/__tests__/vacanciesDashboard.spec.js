import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import Thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';
import initialState from '../../../../redux/reducers/initialState';
import VacancyDashboard from '../VacanciesDashboard';
import VacanciesDashboardContainer from '../VacanciesDashboardContainer';

describe('Vacancy Dashboard', () => {
  const defaultProps = {
    getAllVacanciesAction: jest.fn(),
    getAllVacancies: {
      ...initialState.getAllVacancies,
      data: {
        projectVacancies: [
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
        ],
        certificationVacancies: [
          {
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
        ]
      }
    }
  };
  /**
   * Creates an enzyme instance to test the VacancyDashboard component.
   *
   * @param propOverrides Used to edit the props passed to the component when being mounted
   * @returns { wrapper, props }
   */
  const setup = (isMounted = false) => {
    const mockStore = configureStore([Thunk]);
    const store = mockStore(initialState);

    const wrapper = isMounted
      ? mount(
        <Provider store={store}>
          <VacanciesDashboardContainer />
        </Provider>
      )
      : shallow(<VacancyDashboard {...defaultProps} />);
    return { wrapper };
  };

  it('renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
