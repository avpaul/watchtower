import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import NavArrow from '../Carousel/NavArrow';
import './Filters.css';
import FilterCard from './FilterCard';
import * as filterTypes from '../../redux/constants/fellowFilters';

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
      summary: { onTrack, gteWk5OffTrack, ltWk5OffTrack }
    } = this.props;

    const cardArray = [
      {
        filterId: filterTypes.OFFTRACK_WK5_PLUS,
        cardDetails: {
          title: 'Fellows Off Track',
          subTitle: 'Post week 5',
          totalFellows: gteWk5OffTrack
        }
      },
      {
        filterId: filterTypes.OFFTRACK_WK4_MINUS,
        cardDetails: {
          title: 'Fellows Off Track',
          subTitle: 'Pre week 5',
          totalFellows: ltWk5OffTrack
        }
      },
      {
        filterId: filterTypes.ONTRACK,
        cardDetails: { title: 'Fellows On Track', totalFellows: onTrack }
      }
    ];
    return cardArray;
  };

  carouselOptions = () => {
    const options = {
      className: 'contain row',
      focusOnSelect: true,
      infinite: false,
      slidesToShow: 3,
      swipeToSlide: true,
      nextArrow: (
        <NavArrow buttonClass="slick-next" iconClass="fa-angle-right" />
      ),
      prevArrow: (
        <NavArrow buttonClass="slick-prev" iconClass="fa-angle-left" />
      ),
      responsive: [
        { breakpoint: 900, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
        { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
      ]
    };
    return options;
  };

  /**
   * Fetch new data based on filter
   * @param { Object } - The event that happens.
   */

  handleCardClick(e) {
    const {
      getFellows,
      perPage,
      setFilter,
      loading,
      filter,
      search
    } = this.props;
    if (!loading && e.currentTarget.id !== filter) {
      getFellows({
        perPage,
        search,
        filter: e.currentTarget.id
      });
      setFilter(e.currentTarget.id);
    }
  }

  render() {
    const activeClass = 'card active-card';
    const { filter } = this.props;
    const cardArray = this.cardArray();
    const settings = this.carouselOptions();
    return (
      <Slider {...settings}>
        {cardArray.map(({ filterId, cardDetails }) => (
          <FilterCard
            key={filterId}
            filterId={filterId}
            cardDetails={cardDetails}
            className={filter === filterId ? activeClass : 'card'}
            onClick={this.handleCardClick}
          />
        ))}
      </Slider>
    );
  }
}

Filters.propTypes = {
  getFellows: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  perPage: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]).isRequired,
  filter: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  summary: PropTypes.shape({
    onTrack: PropTypes.number.isRequired,
    ltWk5OffTrack: PropTypes.number.isRequired,
    gteWk5OffTrack: PropTypes.number.isRequired
  }).isRequired
};

export default Filters;
