import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProjectsSummary from '../ProjectsSummary';
import FellowChart from '../FellowChart';
import { generateFilterCardId } from '../Filters/FilterCard';

class ProjectsSummaryChart extends Component {
  state = {
    fellowsSummaryFilter: 'Total',
    showChart: false,
    selected: 'Today'
  };

  constructor(props) {
    super(props);

    this.handleCardClick = this.handleCardClick.bind(this);
  }

  componentDidMount() {
    const { fetchManagerProfile } = this.props;
    fetchManagerProfile();
  }

  updateSelected = selected => this.setState({ selected });

  handleCardClick = event => {
    const currentCard = event.currentTarget.id;
    const {
      manager: {
        data: {
          performance: { today }
        }
      }
    } = this.props;
    if (today.keys && !(currentCard in today.keys))
      this.setState({ showChart: true, fellowsSummaryFilter: currentCard });
  };

  handleChartClose = () => this.setState({ showChart: false });

  /**
   * Retrieves the selected performance trend data
   * @return array List of selected performance trend data
   */
  updateFellowSummary = () => {
    const { selected } = this.state;
    const {
      manager: {
        data: { performance }
      }
    } = this.props;

    return performance[selected.toLowerCase()].data;
  };

  /**
   * Retrieves the document related offsets of the card HTML component
   * @param object cardElement HTML element
   * @return { top , left } Document related offsets
   */
  getCardOffset = cardElement => {
    const rect = cardElement.getBoundingClientRect();
    return {
      top:
        rect.top + (window.pageYOffset || document.documentElement.scrollTop),
      left:
        rect.left + (window.pageXOffset || document.documentElement.scrollLeft)
    };
  };

  /**
   * Retrieves the position of the tooltip arrow that points to the card on focus
   * @return { '--fellow-chart-tooltip' } X-axis position of the tooltip arrow
   */
  getCurrentClass = () => {
    const { fellowsSummaryFilter } = this.state;
    const cardOnFocus = document.querySelector(
      `.${generateFilterCardId(fellowsSummaryFilter)}`
    ).parentNode;
    const cardOnFocusOffsets = this.getCardOffset(cardOnFocus);
    const width = Math.floor(
      cardOnFocusOffsets.left + cardOnFocus.clientWidth / 2
    );
    return { '--fellow-chart-tooltip': `${width}px` };
  };

  render() {
    const { fellowsSummaryFilter, showChart } = this.state;
    const { user } = this.props;

    return (
      <div>
        <ProjectsSummary handleCardClick={this.handleCardClick} />
        {showChart && (
          <FellowChart
            filter={fellowsSummaryFilter}
            handleChartClose={this.handleChartClose}
            updateSelected={this.updateSelected}
            data={this.updateFellowSummary()}
            fellowChartTooltipClass={this.getCurrentClass()}
            user={user}
          />
        )}
      </div>
    );
  }
}

ProjectsSummaryChart.propTypes = {
  fetchManagerProfile: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  manager: PropTypes.instanceOf(Object).isRequired
};

export default ProjectsSummaryChart;
