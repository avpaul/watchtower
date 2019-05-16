import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NavArrow extends Component {
  handleArrowClick = event => {
    const { onClick, currentSlide, slideCount, handleChartClose } = this.props;
    const className = event.target.className.split(' ')[1];
    if (
      currentSlide === 0 ||
      (className === 'fa-angle-right' && currentSlide <= slideCount)
    ) {
      onClick();
    }
    if (currentSlide > 0 && className === 'fa-angle-left') {
      onClick();
    }
    if (handleChartClose instanceof Function) handleChartClose();
  };

  getArrowHideClass = (btnClass, currentSlide, slideCount) => {
    if (currentSlide === 0) {
      return currentSlide === 0 && btnClass === 'slick-prev'
        ? 'slick-arrow-hide'
        : '';
    }
    return (currentSlide === slideCount - 1 ||
      currentSlide === slideCount - 2) &&
      btnClass === 'slick-next'
      ? 'slick-arrow-hide'
      : '';
  };

  render() {
    const { buttonClass, iconClass, currentSlide, slideCount } = this.props;

    return (
      <div
        role="presentation"
        className={`slick-arrow ${buttonClass} ${this.getArrowHideClass(
          buttonClass,
          currentSlide,
          slideCount
        ) || this.getArrowHideClass(buttonClass, currentSlide, slideCount)}`}
        onClick={this.handleArrowClick}
      >
        <span role="presentation" className={`fa ${iconClass}`} />
      </div>
    );
  }
}

NavArrow.propTypes = {
  buttonClass: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  currentSlide: PropTypes.number.isRequired,
  slideCount: PropTypes.number.isRequired,
  handleChartClose: PropTypes.func.isRequired
};

NavArrow.defaultProps = {
  onClick: () => {}
};

export default NavArrow;
