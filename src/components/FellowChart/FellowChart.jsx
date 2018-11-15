import React, { Component } from 'react';
import PropTypes from 'prop-types';

import reduceChartData from '../../services/reduceChartData';
import RadioCard from './RadioCard/RadioCard';
import Chart from './Chart/Chart';
import './FellowChart.css';

class FellowChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'All'
    };
  }

  handleRadioClick = event => {
    this.setState({ selected: event.target.value });
  };

  renderRadioCard = () => {
    const { selected } = this.state;
    const { radioCardOptions } = this.props;

    return radioCardOptions.map(entry => (
      <RadioCard
        key={entry.value}
        handleRadioClick={this.handleRadioClick}
        current={selected}
        {...entry}
      />
    ));
  };

  renderCloseButton = () => {
    const { handleChartClose } = this.props;
    return (
      <button
        type="button"
        className="close fellow-chart-close"
        aria-label="Close Fellow Chart"
        onClick={handleChartClose}
      >
        <i className="far fa-times-circle" aria-hidden="true" />
      </button>
    );
  };

  render() {
    const { selected } = this.state;
    const { fellowsCount, radioCardOptions, fellowChartTooltip } = this.props;
    const title = radioCardOptions.find(({ value }) => value === selected).name;
    const chartData = reduceChartData(selected, fellowsCount);

    return (
      <div className="fellow-chart-container">
        <div className="base" style={fellowChartTooltip} />
        <div className="fellow-chart">
          {this.renderCloseButton()}
          {this.renderRadioCard()}
          <Chart data={chartData} title={title} />
        </div>
      </div>
    );
  }
}
FellowChart.defaultProps = {
  fellowChartTooltip: { '--fellow-chart-tooltip': '13%' }
};

FellowChart.propTypes = {
  fellowsCount: PropTypes.arrayOf(PropTypes.object).isRequired,
  radioCardOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleChartClose: PropTypes.func.isRequired,
  fellowChartTooltip: PropTypes.shape({
    '--fellow-chart-tooltip': PropTypes.string.isRequired
  })
};

export default FellowChart;
