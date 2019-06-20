import React from 'react';
import PropTypes from 'prop-types';
import More from '../../static/More.svg';
import projectIcon from '../../static/projectIcon.png';

import './ProjectCard.css';

const ProjectCard = ({ project }) => (
  <div className="project-card">
    <div className="row">
      <div className="col-12">
        <div className="project-card__icon p-2">
          <img src={More} alt="" />
        </div>
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="project-card__image pt-3">
        <img src={project.logo || projectIcon} alt="" />
      </div>
    </div>
    <div className="project-card__name">
      <p>{project.name}</p>
    </div>
    <div className="project-card__description mx-auto">
      <p>{project.about.substring(0, 45)}...</p>
    </div>
    <div className="project-card__engineers">
      <p>{project.engineers.length} engineers</p>
    </div>
  </div>
);

ProjectCard.propTypes = {
  project: PropTypes.shape({}).isRequired
};
export default ProjectCard;
