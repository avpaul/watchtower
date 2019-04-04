import React from 'react';
import PropTypes from 'prop-types';
import DisplayCard from '../Filters/DisplayCard';

const FellowRatio = ({ mapDisplayContent, fellowMapOnClick }) => (
  <div className="row map-card-row">
    {mapDisplayContent().map((displayContent, index) => (
      <DisplayCard
        key={displayContent.title}
        id={index}
        onClick={fellowMapOnClick}
        displayContent={displayContent}
      />
    ))}
  </div>
);

FellowRatio.propTypes = {
  mapDisplayContent: PropTypes.func.isRequired,
  fellowMapOnClick: PropTypes.func.isRequired
};
export default FellowRatio;
