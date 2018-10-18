import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as filterTypes from '../../redux/constants/fellowFilters';

import './Filters.css';

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

  /**
   * Fetch new data based on filter
   * @param { Object } - The event that happens.
   */

  handleCardClick(e) {
    const {
      getFellows, page, perPage, setFilter,
    } = this.props;
    getFellows({ perPage, page, filter: e.currentTarget.id });
    setFilter(e.currentTarget.id);
  }

  render() {
    const activeClass = 'card active-card';

    const {
      filter,
      summary: { onTrack, gteWk5OffTrack, ltWk5OffTrack },
    } = this.props;
    return (
      <div className=" owl-carousel owl-theme contain row">
        <div
          className={filter === filterTypes.OFFTRACK_WK5_PLUS ? activeClass : 'card'}
          id={filterTypes.OFFTRACK_WK5_PLUS}
          onClick={this.handleCardClick}
          onKeyDown={null}
          role="button"
          tabIndex="-1"
        >
          <p className="title">Fellows Off Track</p>
          <p className="sub">Post week 5</p>
          <p className="number">{gteWk5OffTrack}</p>
        </div>
        <div
          className={filter === filterTypes.OFFTRACK_WK4_MINUS ? activeClass : 'card'}
          id={filterTypes.OFFTRACK_WK4_MINUS}
          onClick={this.handleCardClick}
          onKeyDown={null}
          role="button"
          tabIndex="-1"
        >
          <p className="title">Fellows Off Track</p>
          <p className="pull-left sub">Pre week 5</p>
          <p className="numbers">{ltWk5OffTrack}</p>
        </div>
        <div
          className={filter === filterTypes.ONTRACK ? activeClass : 'card'}
          id={filterTypes.ONTRACK}
          onClick={this.handleCardClick}
          onKeyDown={null}
          role="button"
          tabIndex="-1"
        >
          <p className="title2">Fellows On Track</p>
          <p className="numb">{onTrack}</p>
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  getFellows: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  summary: PropTypes.shape({
    onTrack: PropTypes.number.isRequired,
    ltWk5OffTrack: PropTypes.number.isRequired,
    gteWk5OffTrack: PropTypes.number.isRequired,
  }).isRequired,
};
export default Filters;
