import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as filterTypes from '../../redux/constants/fellowFilters';

import './Filters.css';
import FilterCard from './FilterCard';

/**
 * Class representing Filters for the table
 * @class
 */
class Filters extends Component {
  /** @constructor */
  constructor(props) {
    super(props);
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  cardArray = () => {
    const {
      summary: { onTrack, gteWk5OffTrack, ltWk5OffTrack },
    } = this.props;

    const cardArray = [
      {
        filterId: filterTypes.OFFTRACK_WK5_PLUS,
        cardDetails: {
          title: 'Fellows Off Track',
          subTitle: 'Post week 5',
          totalFellows: gteWk5OffTrack,
        },
      },
      {
        filterId: filterTypes.OFFTRACK_WK4_MINUS,
        cardDetails: {
          title: 'Fellows Off Track',
          subTitle: 'Pre week 5',
          totalFellows: ltWk5OffTrack,
        },
      },
      {
        filterId: filterTypes.ONTRACK,
        cardDetails: { title: 'Fellows On Track', totalFellows: onTrack },
      },
    ];
    return cardArray;
  };

  /**
   * Fetch new data based on filter
   * @param { Object } - The event that happens.
   */

  handleCardClick(e) {
    const {
      getFellows, perPage, setFilter, loading, filter, search,
    } = this.props;
    if (!loading && e.currentTarget.id !== filter) {
      getFellows({
        perPage, search, filter: e.currentTarget.id,
      });
      setFilter(e.currentTarget.id);
    }
  }

  render() {
    const activeClass = 'card active-card';
    const { filter } = this.props;
    const cardArray = this.cardArray();
    return (
      <div className="owl-theme contain row">
        {cardArray.map(({ filterId, cardDetails }) => (
          <FilterCard
            key={filterId}
            filterId={filterId}
            cardDetails={cardDetails}
            className={filter === filterId ? activeClass : 'card'}
            onClick={this.handleCardClick}
          />
        ))}
      </div>
    );
  }
}

Filters.propTypes = {
  getFellows: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  perPage: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired])
    .isRequired,
  filter: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  summary: PropTypes.shape({
    onTrack: PropTypes.number.isRequired,
    ltWk5OffTrack: PropTypes.number.isRequired,
    gteWk5OffTrack: PropTypes.number.isRequired,
  }).isRequired,
};
export default Filters;
