import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './CadreProjectDetails.scss';
import arrayKey from 'weak-key';
import DefaultManagerIcon from '../../static/profile.svg';
import DefaultProjectIcon from '../../static/projectIcon.png';
import ProjectLinks from './ProjectLinks';

const formatStacks = (technologies = []) =>
  technologies.map(technology => (
    <span className="stack" key={arrayKey(technology)}>
      {technology.name || ''}
    </span>
  ));
const ProjectDetailsCardSmall = ({
  projectDetails,
  projectDetails: { technologies }
}) => (
  <Fragment>
    <div className="project-details__card-small">
      <div className="project-details">
        <div className="project-type">
          <div>{projectDetails.type.toUpperCase()}</div>
        </div>
        <div className="project-logo">
          <img
            src={projectDetails.logo || DefaultProjectIcon}
            alt="project-logo"
          />
          <h3>{projectDetails.name}</h3>
        </div>
        <div className="project-theme">
          <p>{projectDetails.tagline}</p>
        </div>
        <div className="project-stacks">{formatStacks(technologies)}</div>
      </div>

      <div className="project-team">
        <h4>Project Manager</h4>
        <div className="project-manager-details">
          <img
            className="manager-photo"
            src={DefaultManagerIcon}
            alt="manager-pic"
          />
          <div className="manager-details">
            <h4>{projectDetails.manager.name}</h4>
            <p>{projectDetails.manager.email}</p>
          </div>
        </div>
      </div>

      <div className="project-links">
        <ProjectLinks projectDetails={projectDetails} />
      </div>
    </div>
  </Fragment>
);
ProjectDetailsCardSmall.propTypes = {
  projectDetails: PropTypes.shape({}).isRequired
};

export default ProjectDetailsCardSmall;
