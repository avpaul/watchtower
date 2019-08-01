import React from 'react';
import PropTypes from 'prop-types';

import './EngineerProjectSummaryCard.scss';
import project from '../../static/Project.svg';
import projectIcon from '../../static/projectIcon.png';
import userIcon from '../../static/User.svg';

const renderProjectTechnologies = technologies => {
  const mappedStacks = technologies.map(stack => (
    <div className="language-rectangle" key={stack.name}>
      <span className="language"> {stack.name}</span>
    </div>
  ));

  return mappedStacks;
};

const renderD1ProjectSummary = profile =>
  profile.project && Object.keys(profile.project).length !== 0 ? (
    <div className="summary-container">
      <div className="product">
        <img className="product-logo" src={projectIcon} alt="Project Icon" />
        <span className="product-name">{profile.project.name}</span>
        <span className="product-mission">{profile.project.tagline}</span>
        <div className="product-technologies">
          {renderProjectTechnologies(profile.project.technologies)}
        </div>
      </div>
      <div className="line" />
      <div className="product-details">
        <div className="manager-details">
          <span className="manager-header">My Team Manager</span>
          <div className="manager-row">
            <img className="manager-image" src={userIcon} alt="Manager" />
            <div className="mgr-name-email">
              <span className="manager-name">
                {profile.project.manager.name}
              </span>
              <span className="manager-email">
                {profile.project.manager.email}
              </span>
            </div>
          </div>
        </div>
        <div className="my-role">
          <span className="role-header">My Role</span>
          <span className="role">{!profile.role ? '' : profile.role.name}</span>
        </div>
        <div className="date">
          <span className="date-header">Start Date</span>
          <span className="start-date">--/--/----</span>
        </div>
      </div>
    </div>
  ) : (
    <div className="no-project-container">
      <img src={project} alt="project-icon" />
      <span>You&apos;re currently not active on any Cadre project</span>
    </div>
  );

const ProjectSummary = props => {
  const { profile } = props;
  return (
    <div className="card-wrapper">
      <span className="header-span">My Project</span>
      {renderD1ProjectSummary(profile)}
    </div>
  );
};

ProjectSummary.propTypes = {
  profile: PropTypes.shape().isRequired
};

export default ProjectSummary;
