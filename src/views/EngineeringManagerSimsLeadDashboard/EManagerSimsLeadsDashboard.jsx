import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DisplayCard from '../../components/Filters/DisplayCard';
import FellowChart from '../../components/FellowChart';
import TtlsFellowSummary from './TtlsFellowSummary';
import ManagerFellowMap from '../../components/ManagerFellowMap';
import FellowsProgressBar from './FellowsProgressBar';
import { getCurrentClass } from '../../utils';

const emDashboardStyle = {
  paddingLeft: '0',
  paddingRight: '0',
  paddingBottom: '49px'
};

/**
 * Class representing Engineering Manager dashboard
 * @class
 */
class EManagerSimsLeadsDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEngineeringManager: false,
      show: false,
      showChart: false,
      managerFellowSortRatio: 'HIGH_TO_LOW',
      options: {
        chartTitle: 'Total',
        filter: 'total-fellows-card',
        filterCardRefs: [],
        toolTipOption: 'total-fellows-card'
      },
      sortLabel: 'Fellow Ratio, High to Low'
    };
    this.onSelectManagerFellowRatioCard = this.onSelectManagerFellowRatioCard.bind(
      this
    );
  }

  componentDidMount() {
    const { getEmsSimsLeadsActions, fetchFellowsSummaryEm, role } = this.props;
    getEmsSimsLeadsActions();
    fetchFellowsSummaryEm();
    this.setState({ isEngineeringManager: role === 'WATCH_TOWER_EM' });
  }

  onSelectManagerFellowRatioCard = (type, value) => {
    if (type === 'lfFellowRatio') {
      this.setState({
        managerFellowSortRatio: value
          .slice(-11)
          .replace(/\s/g, '_')
          .toUpperCase(),
        sortLabel: value
      });
    }
  };

  mapDisplayFellowSummary = (managersArray, totalFellows) => {
    const displayList = [
      {
        id: 'total-fellows-card',
        title: 'Total D0 Fellows',
        subTitle: 'Click to see details',
        totalFellows: `${totalFellows === undefined ? 0 : totalFellows}`
      }
    ];
    managersArray.forEach(manager => {
      const id = manager.staff_id;
      const { managerRole } = manager;
      const name = `${manager.managerName}`.split(' ');
      const content = {
        id,
        title: managerRole
          .concat(' - ')
          .concat(name[0], ' ', name[1].substring(1, 0)),
        subTitle: 'Click to see details',
        totalFellows: manager.fellowsCount
      };
      displayList.push(content);
    });
    return displayList;
  };

  fellowMapOnClick = () => {
    this.setState({
      show: true
    });
  };

  handleMapClose = () => {
    this.setState({ show: false });
  };

  handleCardClick = event => {
    let cardId = event.currentTarget.id;
    const { options } = this.state;
    options.toolTipOption = cardId;
    if (cardId === 'total-fellows-card') {
      cardId = 'Total';
    }
    options.filter = cardId;
    this.setState({
      showChart: true,
      options
    });
  };

  handleChartClose = () => {
    this.setState({ showChart: false });
  };

  renderManagerFellowMap = () => {
    const {
      show,
      isEngineeringManager,
      managerFellowSortRatio,
      sortLabel
    } = this.state;
    const {
      data: {
        managers: { data: managees = [] }
      }
    } = this.props;

    const [managers, style] = isEngineeringManager
      ? [managees, { '--arrow-left-margin-style': '31%' }]
      : [managees, { '--arrow-left-margin-style': '9%' }];
    return (
      show && (
        <ManagerFellowMap
          // Map fellow ratio to their manager
          arrowStyle={style}
          handleMapClose={this.handleMapClose}
          onSortManagers={this.onSelectManagerFellowRatioCard}
          sortRatio={managerFellowSortRatio}
          managers={managers}
          sortLabel={sortLabel}
        />
      )
    );
  };

  mapDisplayContent = () => {
    const { isEngineeringManager } = this.state;
    const {
      data: {
        managers: { averageFellowsPerManager = 0 }
      }
    } = this.props;
    return [
      {
        title: isEngineeringManager ? 'TTL to FELLOW MAP' : 'LF to FELLOW MAP',
        subTitle: 'Click to see details',
        text: isEngineeringManager
          ? 'Average TTL to Fellow ratio'
          : 'Average LF to Fellow ratio',
        averageValue: parseInt(averageFellowsPerManager, 10)
      }
    ];
  };

  fellowChart = (showChart, user, fellowsSummary, options) =>
    showChart && (
      <FellowChart
        handleChartClose={this.handleChartClose}
        data={fellowsSummary.summary}
        user={user}
        loading={fellowsSummary.loading || false}
        filter={options.filter}
        title={options.chartTitle}
        fellowChartTooltipClass={
          options.filterCardRefs
            ? getCurrentClass(options.toolTipOption, options.filterCardRefs)
            : ''
        }
      />
    );

  displayCardMap = () => (
    <div className="row map-card-row">
      {this.mapDisplayContent().map((displayContent, index) => (
        <DisplayCard
          key={displayContent.title}
          id={index}
          onClick={this.fellowMapOnClick}
          displayContent={displayContent}
        />
      ))}
    </div>
  );

  render() {
    const {
      fellowsSummary,
      user,
      data: { managers }
    } = this.props;
    const { showChart, options } = this.state;

    return (
      <div className="container-fluid" style={emDashboardStyle}>
        <TtlsFellowSummary
          fellowsSummary={this.mapDisplayFellowSummary(
            managers.data || [],
            managers.totalFellows || 0
          )}
          handleCardClick={this.handleCardClick}
          fellowSummaryCardComponent={this}
        />
        {this.fellowChart(showChart, user, fellowsSummary, options)}
        {this.displayCardMap()}
        {this.renderManagerFellowMap()}
        <FellowsProgressBar />
      </div>
    );
  }
}

EManagerSimsLeadsDashboard.propTypes = {
  // required prop-types
  fellowsSummary: PropTypes.shape({}).isRequired,
  fetchFellowsSummaryEm: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
  getEmsSimsLeadsActions: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  data: PropTypes.shape().isRequired
};

export default EManagerSimsLeadsDashboard;
