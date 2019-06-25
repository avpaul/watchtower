import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';
import initialState from '../../../../redux/reducers/initialState';
import ProjectsDashboard from '../ProjectsDashboard';
import mockProject from '../../../../__mocks__/projectDetails';

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
    const mockStore = configureStore([Thunk]);
    const store = mockStore({
      ...initialState,
      allProjects: {
        ...initialState.allProjects,
        data: [mockProject]
      }
    });

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter keyLength={0} initialEntries={[testURL]}>
          <ProjectsDashboard {...defaultProps} />
        </MemoryRouter>
      </Provider>
    );
    return { wrapper };
  };

  it('renders correctly using valid location path', () => {
    const { wrapper } = setup();
    expect(wrapper.find('ProjectForm').exists()).toBeTruthy();
  });

  it('renders the ProjectDetails page correctly', () => {
    const { wrapper } = setup('/cadre/projects/details/1');
    expect(wrapper.find('ProjectDetails').exists()).toBeTruthy();
  });

  it('renders correctly using invalid path location', () => {
    const { wrapper } = setup('/cadre/projects/invalid');
    expect(wrapper.find('ProjectForm').exists()).not.toBeTruthy();
  });
});
