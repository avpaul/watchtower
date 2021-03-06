import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Chart from './Chart/Chart';
import './FellowChart.scss';

class FellowChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'Trend'
    };
  }

  handleRadioClick = event => {
    const { selected } = this.state;
    const { updateSelected } = this.props;
    this.setState({ selected: event.target.value });
    updateSelected(selected);
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
    return (
      <div className="fellow-chart-container">
        <div className="base" style={fellowChartTooltip} />
        <div className="fellow-chart">
          {this.renderCloseButton()}
          <Chart data={fellowsCount} title={title} />
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
  updateSelected: PropTypes.func.isRequired,
  user: PropTypes.shape({}).isRequired,
  fellowChartTooltip: PropTypes.shape({
    '--fellow-chart-tooltip': PropTypes.string.isRequired
  })
};

export default FellowChart;
