import React from 'react';
import PropTypes from 'prop-types';
import RenderItem from './RenderItem';

const BioCard = ({ data, Id }) => (
  <div className="bio">
    <div className="my-bio">MY PROFILE</div>
    <div className="card-bio" id={Id} role="button" tabIndex="0">
      <RenderItem title="Cohort">{data.cohort}</RenderItem>
      <RenderItem title="Level">{data.level}</RenderItem>
      <RenderItem title="Start Date">
        {data.actualApprenticeshipStartDate || data.simulationStartDate}
      </RenderItem>
      <RenderItem title="End Date">
        {data.expectedApprenticeshipCompletionDate ||
          data.expectedSimulationsCompletionDate}
      </RenderItem>
    </div>
  </div>
);

BioCard.propTypes = {
  data: PropTypes.string.isRequired,
  Id: PropTypes.string.isRequired
};

export default BioCard;
