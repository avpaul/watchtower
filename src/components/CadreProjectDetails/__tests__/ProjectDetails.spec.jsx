import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../redux/actionCreators/projectsActions';
import ProjectDetails from '../ProjectDetails';
import ProjectDetailsCardBig from '../ProjectDetailsCardBig';
import ProjectDetailsCardSmall from '../ProjectDetailsCardSmall';
import ProjectDetailsContainer from '../ProjectDetailsContainer';
import projectDetails from '../../../__mocks__/projectDetails';
import ProjectLinks from '../ProjectLinks';

jest.spyOn(actions, 'getAProject');
actions.getAProject.mockImplementation(() => ({
  type: 'GET_SINGLE_PROJECT_REQUEST'
}));

describe('Project details card tests', () => {
  const props = {
    allProjects: {
      data: [projectDetails]
    },
    allRoles: {
      data: projectDetails.engineers.map(engineer => ({
        name: engineer.project_role_name,
        id: 1
      }))
    },
    match: {
      params: { id: 1 }
    },
    history: { replace: jest.fn() },
    getProject: {},
    getAProjectReducer: jest.fn()
  };

  const initialState = {
    singleProject: {
      data: {
        project: [projectDetails]
      }
    },
    allRoles: {
      data: projectDetails.engineers.map(engineer => ({
        name: engineer.project_role_name,
        id: 1
      }))
    },
    loading: true
  };

  const mockStore = configureStore([thunk]);
  const store = mockStore(initialState);

  const setup = (CardName, otherProps) => {
    const projectDetailsCardWrapper = shallow(
      <CardName {...props} projectDetails={otherProps} />
    );
    return projectDetailsCardWrapper;
  };

  it('should render project details page without crashing', () => {
    const { projectDetailsCardWrapper } = setup(ProjectDetails);
    expect(projectDetailsCardWrapper).toMatchSnapshot();
  });

  it('should render project details card BIG without crashing', () => {
    const { projectDetailsCardWrapper } = setup(
      ProjectDetailsCardBig,
      props.allProjects.data[0]
    );

    expect(projectDetailsCardWrapper).toMatchSnapshot();
  });
  it('should render project details card SMALL without crashing', () => {
    const { projectDetailsCardWrapper } = setup(
      ProjectDetailsCardSmall,
      props.allProjects.data[0]
    );
    expect(projectDetailsCardWrapper).toMatchSnapshot();
  });
  it('should render project links component successfully', () => {
    const projectLinkWrapper = shallow(
      <ProjectLinks projectDetails={projectDetails} />
    );
    expect(projectLinkWrapper).toMatchSnapshot();
  });

  it('should get a single project if no project details is available', () => {
    const newProps = {
      allProjects: {
        data: []
      },
      match: {
        params: { id: 1 }
      },
      history: { replace: jest.fn() },
      getProject: jest.fn()
    };

    mount(
      <MemoryRouter>
        <ProjectDetailsContainer store={store} {...newProps} />
      </MemoryRouter>
    );
    expect(store.getActions()[0].type).toBe('GET_SINGLE_PROJECT_REQUEST');
  });
});
