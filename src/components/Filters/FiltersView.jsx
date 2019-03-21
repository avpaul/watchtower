import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import arrayKey from 'weak-key';
import { carouselOptions } from '../../utils';
import FilterCard from './FilterCard';

const FiltersView = ({ handleCardClick, filters, filterCardClassName }) => (
  <Slider {...carouselOptions(3)}>
    {filters.map(filter => (
      <div className={filterCardClassName} key={arrayKey(filter)}>
        <FilterCard
          filterId={filter.id || filter.title}
          cardDetails={filter}
          className="card"
          onClick={handleCardClick}
        />
      </div>
    ))}
  </Slider>
);

FiltersView.propTypes = {
  handleCardClick: PropTypes.func.isRequired,
  filters: PropTypes.instanceOf(Array).isRequired,
  filterCardClassName: PropTypes.string
};

FiltersView.defaultProps = {
  filterCardClassName: ''
};

export default FiltersView;
