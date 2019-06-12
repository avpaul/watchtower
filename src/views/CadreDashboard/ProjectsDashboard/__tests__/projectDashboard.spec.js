import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import initialState from '../../../../redux/reducers/initialState';
import ProjectsDashboard from '../ProjectsDashboard';

describe('Projects Dashboard', () => {
  const defaultProps = {
    match: {
      url: '/cadre/projects'
    },
    history: {}
  };
  /**
   * Creates an enzyme instance to test the projectForm component.
   *
   * @param propOverrides Used to edit the props passed to the component when being mounted
   * @returns { wrapper, props }
   */
  const setup = (testURL = '/cadre/projects/create') => {
    const mockStore = configureStore();
    const store = mockStore(initialState);

    const wrapper = mount(
      <MemoryRouter keyLength={0} initialEntries={[testURL]}>
        <ProjectsDashboard store={store} {...defaultProps} />
      </MemoryRouter>
    );
    return { wrapper };
  };

  it('renders correctly using valid location path', () => {
    const { wrapper } = setup();
    expect(wrapper.find('ProjectForm').exists()).toBeTruthy();
  });

  it('renders correctly using invalid path location', () => {
    const { wrapper } = setup('/cadre/projects/invalid');
    expect(wrapper.find('ProjectForm').exists()).not.toBeTruthy();
  });
});
