import React from 'react';
import PropTypes from 'prop-types';
import RenderItem from './RenderItem';

const ProjectCard = ({ data, Id }) => (
  <div className="project">
    <div className="my-project">MY PROJECT</div>
    <div className="card-project" id={Id} role="button" tabIndex="0">
      <RenderItem title="Project Name">
        {data.apprenticeshipTeam || data.simulationsTeam}
      </RenderItem>
      <RenderItem title={data.apprenticeshipManager ? 'TTL' : 'LF'}>
        {data.apprenticeshipManager || data.simulationsPM}
      </RenderItem>
      <RenderItem title="PM">--</RenderItem>
    </div>
  </div>
);

ProjectCard.propTypes = {
  Id: PropTypes.string.isRequired,
  data: PropTypes.shape().isRequired
};

export default ProjectCard;
