import React from 'react';
import PropTypes from 'prop-types';
import FilterCard from './FilterCard';

const DisplayCard = ({ displayContent, id, onClick }) => {
  const { title, text, averageValue } = displayContent;
  return (
    <div className="map-card-wrapper">
      <h5>{title}</h5>
      <FilterCard
        id={id}
        filterId={id}
        cardDetails={{ title: text, totalFellows: `1:${averageValue}` }}
        className="card map-card"
        onClick={onClick}
      />
    </div>
  );
};
DisplayCard.propTypes = {
  displayContent: PropTypes.objectOf(
    PropTypes.oneOfType([ PropTypes.string, PropTypes.number])).isRequired,
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default DisplayCard;
