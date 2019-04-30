import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DisplayCard from '../../components/Filters/DisplayCard';
import FellowChart from '../../components/FellowChart';
import TtlsFellowSummary from './TtlsFellowSummary';
import ManagerFellowMap from '../../components/ManagerFellowMap';
import FellowsProgressBar from './FellowsProgressBar';

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
      managerFellowSortRatio: 'HIGH_TO_LOW'
    };
    this.onSelectManagerFellowRatioCard = this.onSelectManagerFellowRatioCard.bind(
      this
    );
  }

  componentDidMount() {
    const {
      fetchFellowsSummaryEm,
      getEmsSimsLeadsActions,
      user,
      role
    } = this.props;
    getEmsSimsLeadsActions();
    fetchFellowsSummaryEm(user.email);
    this.setState({ isEngineeringManager: role === 'WATCH_TOWER_EM' });
  }

  onSelectManagerFellowRatioCard = value => {
    this.setState({
      managerFellowSortRatio: value
        .slice(-11)
        .replace(/\s/g, '_')
        .toUpperCase()
    });
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
      const id = manager.managerName;
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
    const cardId = event.currentTarget.id.replace(/\s+/g, ' ').trim();
    const {
      fetchFellowsSummaryTtl,
      fetchFellowsSummaryLf,
      fetchFellowsSummarySl,
      fetchFellowsSummaryEm,
      user
    } = this.props;

    if (cardId === 'total-fellows-card') {
      if (user.roles.WATCH_TOWER_EM) {
        fetchFellowsSummaryEm(user.email);
      } else {
        fetchFellowsSummarySl(user.email);
      }
      this.setState({ showChart: true });
    } else if (user.roles.WATCH_TOWER_EM) {
      fetchFellowsSummaryTtl(cardId);
      this.setState({ showChart: true });
    } else {
      fetchFellowsSummaryLf(cardId);
      this.setState({ showChart: true });
    }
  };

  handleChartClose = () => {
    this.setState({ showChart: false });
  };

  renderManagerFellowMap = () => {
    const { show, isEngineeringManager, managerFellowSortRatio } = this.state;
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
        averageValue: averageFellowsPerManager
      }
    ];
  };

  fellowChart = (showChart, chartData, user, fellowsSummary) =>
    showChart && (
      <FellowChart
        handleChartClose={this.handleChartClose}
        data={chartData}
        user={user}
        loading={fellowsSummary.loading || false}
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
    const { showChart } = this.state;
    const chartData = fellowsSummary.summary;

    return (
      <div className="container-fluid" style={emDashboardStyle}>
        <TtlsFellowSummary
          fellowsSummary={this.mapDisplayFellowSummary(
            managers.data || [],
            managers.totalFellows || 0
          )}
          handleCardClick={this.handleCardClick}
        />
        {this.fellowChart(showChart, chartData, user, fellowsSummary)}
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
  fetchFellowsSummarySl: PropTypes.func.isRequired,
  fetchFellowsSummaryLf: PropTypes.func.isRequired,
  fetchFellowsSummaryTtl: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
  getEmsSimsLeadsActions: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  data: PropTypes.shape().isRequired
};

export default EManagerSimsLeadsDashboard;
