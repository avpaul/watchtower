import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import Thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';
import initialState from '../../../../redux/reducers/initialState';
import VacancyDashboard from '../VacanciesDashboard';

describe('Vacancy Dashboard', () => {
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
            <VacancyDashboard />
          </Provider>
        )
      : shallow(<VacancyDashboard />);
    return { wrapper };
  };

  it('renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
