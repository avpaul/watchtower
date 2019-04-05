import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader/Loader';
import RenderItem from './RenderItem';

const renderProjectDetails = fellow => (
  <React.Fragment>
    <RenderItem title="Project Name">
      {fellow.details.apprenticeshipTeam || fellow.details.simulationsTeam}
    </RenderItem>
    <RenderItem title={fellow.details.apprenticeshipManager ? 'TTL' : 'LF'}>
      {fellow.details.apprenticeshipManager || fellow.details.simulationsPM}
    </RenderItem>
    <RenderItem title="PM">--</RenderItem>
  </React.Fragment>
);

const ProjectCard = ({ data: { fellow, loading } }) => (
  <div className="project">
    <div className="my-project">MY PROJECT</div>
    <div
      className="card-project"
      id={`fellow-${fellow.email}`}
      role="button"
      tabIndex="0"
    >
      {!loading && fellow.details ? renderProjectDetails(fellow) : <Loader />}
    </div>
  </div>
);

ProjectCard.propTypes = {
  data: PropTypes.shape().isRequired
};

export default ProjectCard;
