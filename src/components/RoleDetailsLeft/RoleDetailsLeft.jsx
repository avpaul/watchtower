import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import projectIcon from '../../static/projectIcon.png';
import { altDate } from '../../utils/formatDate';

const RoleDetailsLeft = ({ projectInfo, roleInfo }) => {
  const [projectLogo, setLogo] = useState(projectInfo.logo || projectIcon);

  const renderTechnology = (info = [], techClass) =>
    info.map(tech => (
      <span className={techClass} key={tech.id}>
        {tech.name}
      </span>
    ));

  const handleImageError = () => setLogo(projectIcon);

  const renderTop = () => (
    <Fragment>
      <span className="projectType">{projectInfo.type.toUpperCase()}</span>
      <img src={projectLogo} onError={handleImageError} alt="" />
      <p className="projectTitle">{projectInfo.name}</p>
      <p className="projectTagline">{projectInfo.tagline}</p>
    </Fragment>
  );

  return (
    <div className="project-container roles-left">
      <div className="project-overview">
        {renderTop()}
        {renderTechnology(projectInfo.technologies, 'projectStack')}
        {renderTechnology(roleInfo.role.skills, 'projectSkills')}
      </div>
      <div className="roleDetails">
        <p className="">
          {`Available Slot${roleInfo.available_slots > 1 ? 's : ' : ':'}`}
          <span>{`${roleInfo.available_slots}`}</span>
        </p>
        <p>
          Start Date: <span>{` ${altDate(roleInfo.vacancy.start_date)}`}</span>
        </p>
      </div>
      <div className="projectManager">
        <p className="headingText">Team Manager</p>
        <div className="projectManager__details">
          <img
            src="https://lorempixel.com/100/100/people/?97143"
            alt="project manager"
          />
          <div>
            <p className="managerName">{projectInfo.manager.name}</p>
            <p className="managerEmail">{projectInfo.manager.email}</p>
          </div>
        </div>
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
