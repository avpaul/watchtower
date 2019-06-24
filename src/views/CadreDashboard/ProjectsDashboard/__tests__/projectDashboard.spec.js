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
    history: {},
    location: {
      projectDetails: {
        name: 'Watch Tower'
      }
    }
  };

  /**
   * Creates an enzyme instance to test the projectForm component.
   *
   * @param propOverrides Used to edit the props passed to the component when being mounted
   * @returns { wrapper, props }
   */
  const setup = (
    testURL = '/cadre/projects/create',
    optionalProps = defaultProps
  ) => {
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
          <ProjectsDashboard {...optionalProps} />
        </MemoryRouter>
      </Provider>
    );
    return { wrapper };
  };

  it('renders correctly using valid location path', () => {
    const createProps = {
      match: {
        url: '/cadre/projects'
      },
      history: {},
      location: {
        pathname: '/cadre/projects/create'
      }
    };
    const { wrapper } = setup('/cadre/projects/create', createProps);
    expect(wrapper.find('ProjectForm').exists()).toBeTruthy();
  });

  it('renders the ProjectDetails page correctly', () => {
    const { wrapper } = setup('/cadre/projects/1');
    expect(wrapper.find('ProjectDetails').exists()).toBeTruthy();
  });

  it('renders the edit form correctly', () => {
    const editProps = {
      match: {
        param: {
          id: 1
        },
        url: '/cadre/projects'
      },
      history: {
        push: jest.fn()
      },
      location: {
        projectDetails: {
          name: 'Watch Tower'
        },
        pathname: '/cadre/projects/1/edit',
        allProjects: [mockProject]
      }
    };
    const { wrapper } = setup('/cadre/projects/1/edit', editProps);
    expect(wrapper.find('ProjectForm').exists()).toBeTruthy();
  });

  it('renders view projects correctly', () => {
    const { wrapper } = setup('/cadre/projects/');
    expect(wrapper.find('ProjectCard').exists()).toBeTruthy();
  });
});
