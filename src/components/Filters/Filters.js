import React, { Component } from 'react';
import './Filters.css';

/**
 * Class representing Filters for the table
 * @class
 */
class Filters extends Component {
  /** @constructor */
  constructor(props) {
    super(props);
    this.state = {
      activeClass: 'card active-card',
      cardId: null,
    };
    this.divClicked = this.divClicked.bind(this);
  }
  /**
 * Handles the class assignment of a clicked div
 * @param { Object } - The event that happens.
*/

  divClicked(e) {
    if (e) {
      this.setState({ cardId: e.target.id });
    }
  }

  render() {
    const { cardId, activeClass } = this.state;
    return (
      <div className="owl-carousel owl-theme contain row">
        <div className={cardId === 'one' ? activeClass : 'card'} id="one" onClick={this.divClicked} onKeyDown={null} role="button" tabIndex="-1">
          <p className="title">Fellows Off Track</p>
          <p className="sub">Post week 5</p>
          <p className="number">45</p>
        </div>
        <div className={cardId === 'two' ? activeClass : 'card'} id="two" onClick={this.divClicked} onKeyDown={null} role="button" tabIndex="-1">
          <p className="title">Fellows Off Track</p>
          <p className="pull-left sub">Pre week 5</p>
          <p className="numbers">534</p>
        </div>
        <div className={cardId === 'three' ? activeClass : 'card'} id="three" onClick={this.divClicked} onKeyDown={null} role="button" tabIndex="-1">
          <p className="title2">Fellows On Track</p>
          <p className="numb">6723</p>
        </div>
      </div>
    );
  }
}

export default Filters;
