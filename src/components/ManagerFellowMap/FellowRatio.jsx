import React from 'react';
import PropTypes from 'prop-types';
import DisplayCard from '../Filters/DisplayCard';

const FellowRatio = ({ mapDisplayContent, fellowMapOnClick, loading }) => (
  <div className="row map-card-row">
    {mapDisplayContent().map((displayContent, index) => (
      <DisplayCard
        key={displayContent.title}
        id={index}
        onClick={fellowMapOnClick}
        displayContent={displayContent}
        loading={loading}
      />
    ))}
  </div>
);

FellowRatio.propTypes = {
  mapDisplayContent: PropTypes.func.isRequired,
  fellowMapOnClick: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

FellowRatio.defaultProps = {
  loading: false
};
export default FellowRatio;
