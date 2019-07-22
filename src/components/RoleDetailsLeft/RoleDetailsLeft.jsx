import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import projectIcon from '../../static/projectIcon.png';

const RoleDetailsLeft = ({ projectInfo, roleInfo }) => {
  const [projectLogo, setLogo] = useState(projectInfo[0].logo || projectIcon);

  const renderTechnology = (info = [], techClass) =>
    info.map(tech => (
      <span className={techClass} key={tech.id}>
        {tech.name}
      </span>
    ));

  const handleImageError = () => setLogo(projectIcon);

  const renderTop = () => (
    <Fragment>
      <span className="projectType">{projectInfo[0].type.toUpperCase()}</span>
      <img src={projectLogo} onError={handleImageError} alt="" />
      <p className="projectTitle">{projectInfo[0].name}</p>
      <p className="projectTagline">{projectInfo[0].tagline}</p>
    </Fragment>
  );

  return (
    <div className="projectContainer">
      <div className="projectOverview">
        {renderTop()}
        {renderTechnology(projectInfo[0].technologies, 'projectStack')}
        {renderTechnology(roleInfo.skills, 'projectSkills')}
      </div>
      <div className="projectManager">
        <p className="headingText">Team Manager</p>
        <img
          src="https://lorempixel.com/100/100/people/?97143"
          alt="project manager"
        />
        <p className="managerName">{projectInfo[0].manager.name}</p>
        <p className="managerEmail">{projectInfo[0].manager.email}</p>
      </div>
    </div>
  );
};

RoleDetailsLeft.defaultProps = {
  projectInfo: [],
  roleInfo: {}
};

RoleDetailsLeft.propTypes = {
  projectInfo: PropTypes.arrayOf(PropTypes.shape()),
  roleInfo: PropTypes.shape()
};

export default RoleDetailsLeft;
