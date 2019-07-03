import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';
import initialState from '../../../../redux/reducers/initialState';
import CertificationDashboard from '../CertificationDashboard';

describe('CertificationDashboard Dashboard', () => {
  const defaultProps = {
    match: {
      url: '/cadre/certifications'
    },
    history: {}
  };

  /**
   * Creates an enzyme instance to test the CertificationDashboard component.
   *
   * @param propOverrides Used to edit the props passed to the component when being mounted
   * @returns { wrapper, props }
   */
  const setup = (testURL = '/cadre/certifications') => {
    const mockStore = configureStore([Thunk]);
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[testURL]}>
          <CertificationDashboard {...defaultProps} />
        </MemoryRouter>
      </Provider>
    );
    return { wrapper };
  };

  it('renders correctly using valid location path', () => {
    const { wrapper } = setup();
    expect(wrapper.find('WorkInProgress').exists()).toBeTruthy();
  });
});
