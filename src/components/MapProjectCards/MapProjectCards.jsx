import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Projectcard from '../ProjectCard/ProjectCard';
import arrayOfObjectsSorter from '../../utils/sortArray';
import EmptyDashboard from '../WorkInProgress/WorkInProgress';
import './MapProjectCards.scss';

const MapProjectCards = ({ projectData, setDeleteTarget }) => (
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
    {projectData.length === 0 ? (
      <EmptyDashboard title="Welcome, please create the first Project!" />
    ) : (
      <div className="project-card__grid">
        {projectData.sort(arrayOfObjectsSorter('name')).map(project => (
          <Projectcard
            project={project}
            key={project.id}
            focusProject={setDeleteTarget}
          />
        ))}
      </div>
    )}
  </div>
);
MapProjectCards.propTypes = {
  projectData: PropTypes.shape([]),
  setDeleteTarget: PropTypes.func
};

MapProjectCards.defaultProps = {
  projectData: [],
  setDeleteTarget: () => {}
};
export default MapProjectCards;
