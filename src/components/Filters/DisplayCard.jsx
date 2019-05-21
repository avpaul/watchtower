import React from 'react';
import PropTypes from 'prop-types';
import FilterCard from './FilterCard';

const DisplayCard = ({ displayContent, id, onClick, loading }) => {
  const { title, subTitle, text, averageValue } = displayContent;
  return (
    <div className="map-card-wrapper">
      <h5>{title}</h5>
      <FilterCard
        id={id}
        filterId={id}
        cardDetails={{
          title: text,
          subTitle,
          totalFellows: `1:${averageValue}`
        }}
        className="card map-card"
        onClick={onClick}
        loading={loading}
      />
    </div>
  );
};
DisplayCard.propTypes = {
  displayContent: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  loading: PropTypes.bool
};

DisplayCard.defaultProps = {
  onClick: () => {},
  loading: false
};

export default DisplayCard;
