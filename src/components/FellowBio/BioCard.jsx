import React from 'react';
import PropTypes from 'prop-types';
import RenderItem from './RenderItem';
import Loader from '../Loader/Loader';

const renderBioDetails = fellow => (
  <React.Fragment>
    <RenderItem title="Cohort">{fellow.cohort}</RenderItem>
    <RenderItem title="Level">{fellow.level}</RenderItem>
    <RenderItem title="Start Date">
      {fellow.details.actualApprenticeshipStartDate ||
        fellow.details.simulationStartDate}
    </RenderItem>
    <RenderItem title="Estimated End Date">
      {fellow.details.expectedApprenticeshipCompletionDate ||
        fellow.details.expectedSimulationsCompletionDate}
    </RenderItem>
  </React.Fragment>
);

const BioCard = ({ data }) => {
  const { fellow, loading } = data;
  return (
    <div className="bio">
      <div className="my-bio">MY PROFILE</div>
      <div
        className="card-bio"
        id={`fellow-${fellow.email}`}
        role="button"
        tabIndex="0"
      >
        {!loading && fellow.details ? renderBioDetails(fellow) : <Loader />}
      </div>
    </div>
  );
};

BioCard.propTypes = {
  data: PropTypes.shape().isRequired
};

export default BioCard;
