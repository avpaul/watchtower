import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import arrayKey from 'weak-key';
import { carouselOptions } from '../../utils';
import FilterCard from './FilterCard';

class FiltersView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderFilterCard = (
    filter,
    filterCardClassName,
    FellowSummaryCardComponent,
    handleCardClick
  ) => (
    <div
      className={filterCardClassName}
      key={arrayKey(filter)}
      ref={
        FellowSummaryCardComponent
          ? FellowSummaryCardComponent.state.options.filterCardRefs[filter.id]
          : ''
      }
    >
      <FilterCard
        filterId={filter.id || filter.title}
        cardDetails={filter}
        className="card"
        onClick={handleCardClick}
      />
    </div>
  );

  render() {
    const {
      filters,
      filterCardClassName,
      handleCardClick,
      FellowSummaryCardComponent
    } = this.props;
    return (
      <Slider {...carouselOptions(3.99995)}>
        {filters.map(filter => {
          if (FellowSummaryCardComponent) {
            FellowSummaryCardComponent.state.options.filterCardRefs[
              filter.id
            ] = React.createRef();
          }
          return this.renderFilterCard(
            filter,
            filterCardClassName,
            FellowSummaryCardComponent,
            handleCardClick
          );
        })}
      </Slider>
    );
  }
}

FiltersView.propTypes = {
  handleCardClick: PropTypes.func.isRequired,
  filters: PropTypes.instanceOf(Array).isRequired,
  filterCardClassName: PropTypes.string,
  FellowSummaryCardComponent: PropTypes.instanceOf(React.Component).isRequired
};

FiltersView.defaultProps = {
  filterCardClassName: ''
};

export default FiltersView;
