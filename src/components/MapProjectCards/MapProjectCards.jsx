import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProjectCard from '../ProjectCard/ProjectCard';

import './MapProjectCards.css';

const MapProjectCards = ({ projectData }) => (
  <div>
    <div className="row">
      <div className="col-9">
        <p className="project-grid__count">
          <p>
            {`${projectData.length} Project${
              projectData.length === 1 ? '' : 's'
            }`}
          </p>
        </p>
      </div>
      <div className="col-3">
        <Link className="project-grid__add" to="/cadre/projects/create">
          ADD NEW PROJECT
        </Link>
      </div>
    </div>
    <div className="project-card__grid">
      {projectData.map(project => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </div>
  </div>
);
MapProjectCards.propTypes = {
  projectData: PropTypes.shape()
};

MapProjectCards.defaultProps = {
  projectData: []
};
export default MapProjectCards;
