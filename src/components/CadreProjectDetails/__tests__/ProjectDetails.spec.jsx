import React from 'react';
import { shallow } from 'enzyme';
import ProjectDetails from '../ProjectDetails';
import ProjectDetailsCardBig from '../ProjectDetailsCardBig';
import ProjectDetailsCardSmall from '../ProjectDetailsCardSmall';
import projectDetails from '../../../__mocks__/projectDetails';
import ProjectLinks from '../ProjectLinks';

describe('Project details card tests', () => {
  const props = {
    allProjects: {
      data: [projectDetails]
    },
    match: {
      params: { id: 1 }
    },
    history: { replace: jest.fn() }
  };
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
});
