import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';
import initialState from '../../../../redux/reducers/initialState';
import CertificationsDashboard from '..';

describe('Certification Dashboard', () => {
  const defaultProps = {
    match: {
      url: '/cadre/certifications'
    },
    history: {},
    fetchActiveEngineers: jest.fn()
  };

  /**
   * Creates an enzyme instance to test the projectForm component.
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
          <CertificationsDashboard {...defaultProps} />
        </MemoryRouter>
      </Provider>
    );
    return { wrapper };
  };

  it('renders correctly using valid location path', () => {
    const { wrapper } = setup();
    expect(wrapper.find('CadreViewCerts').exists()).toBeTruthy();
  });
});
