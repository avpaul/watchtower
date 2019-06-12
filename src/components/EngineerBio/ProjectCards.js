import React from 'react';
import PropTypes from 'prop-types';
import ParseDate from '../../utils/parseDate';
import RenderStackTechnologies from '../../utils/renderStackTechnologies';
import projectIcon from '../../static/projectIcon.png';

const ProjectCards = ({
  startDate,
  endDate,
  technologies,
  projectLevel,
  projectName
}) => (
  <div className="profile_card">
    <div className="w3-address-grid">
      <div className="w3-address-left">
        <img src={projectIcon} alt="project logo" />
      </div>
      <div className="w3-address-right">
        <h6>{projectName}</h6>
        <p>{projectLevel}</p>
        <p>
          {ParseDate(startDate)} - {ParseDate(endDate)}
        </p>
        <p className="projects">
          {technologies ? RenderStackTechnologies(technologies) : null}
        </p>
      </div>
      <div className="clearfix" />
    </div>
  </div>
);

ProjectCards.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  technologies: PropTypes.string.isRequired,
  projectLevel: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired
};

export default ProjectCards;
