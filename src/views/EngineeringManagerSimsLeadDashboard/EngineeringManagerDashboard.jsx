import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DisplayCard from '../../components/Filters/DisplayCard';
import FellowChart from '../../components/FellowChart';
import TtlsFellowSummary from './TtlsFellowSummary';
import ManagerFellowMap from '../../components/ManagerFellowMap';

/**
 * Class representing Engineering Manager dashboard
 * @class
 */

class EngineeringManagerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      averageFellowsPerTtl: 0,
      averageFellowsPerLf: 0,
      isEngineeringManager: true,
      managerTitle: 'TTL',
      lfs: [],
      ttls: [],
      totalFellows: 0,
      show: false,
      showChart: false,
      managerFellowSortRatio: 'HIGH_TO_LOW'
    };
    this.onSelectManagerFellowRatio = this.onSelectManagerFellowRatio.bind(
      this
    );
  }

  componentDidMount() {
    const {
      fetchFellowsSummaryEm,
      getEngineeringManagerTtls,
      getSimulationsLeadLfs,
      fetchFellowsSummarySl,
      user
    } = this.props;
    if (user.roles.WATCH_TOWER_EM) {
      getEngineeringManagerTtls(user.email).then(data => {
        if (!data.error) {
          this.setState({
            ttls: data.data.engineeringManager.ttls,
            averageFellowsPerTtl: data.data.averageFellowsPerTtl,
            totalFellows: data.data.totalFellows,
            isEngineeringManager: true
          });
        }
        fetchFellowsSummaryEm(user.email);
      });
    } else {
      getSimulationsLeadLfs(user.email).then(data => {
        if (!data.error) {
          this.setState({
            lfs: data.data.simulationsLead.lfs,
            averageFellowsPerLf: data.data.averageFellowsPerLf,
            totalFellows: data.data.totalFellows,
            isEngineeringManager: false,
            managerTitle: 'LF'
          });
          fetchFellowsSummarySl(user.email);
        }
      });
    }
  }

  onSelectManagerFellowRatio(type, value) {
    const sortRatio = value
      .slice(-11)
      .replace(/\s/g, '_')
      .toUpperCase();
    this.setState({ managerFellowSortRatio: sortRatio });
  }

  mapDisplayFellowSummary = (managersArray, totalFellows, title) => {
    const titleName = title.concat(' - ');
    const displayList = [
      {
        id: 'total-fellows-card',
        title: 'Total D0 Fellows',
        // subTitle: 'Click to see details',
        totalFellows: `${totalFellows === undefined ? 0 : totalFellows}`
      }
    ];
    for (let i = 0; i < managersArray.length; i += 1) {
      const ttlsName = `${managersArray[i].firstName} ${
        managersArray[i].lastName
      }`;
      const lfEmail = managersArray[i].email;
      const id = managersArray[i].roleId === 2 ? ttlsName : lfEmail;
      const content = {
        id,
        title: titleName.concat(
          managersArray[i].firstName,
          ' ',
          managersArray[i].lastName.substring(1, 0)
        ),
        totalFellows: managersArray[i].fellowsCount
      };
      displayList.push(content);
    }
    return displayList;
  };

  fellowMapOnClick = () => {
    const { isEngineeringManager } = this.state;
    this.setState({
      managerTitle: isEngineeringManager ? 'TTL' : 'LF',
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
    const {
      show,
      managerFellowSortRatio,
      managerTitle,
      lfs,
      ttls
    } = this.state;
    const [managers, style] =
      managerTitle === 'TTL'
        ? [ttls, { '--arrow-left-margin-style': '31%' }]
        : [lfs, { '--arrow-left-margin-style': '9%' }];
    return (
      show && (
        <ManagerFellowMap
          arrowStyle={style}
          handleMapClose={this.handleMapClose}
          onSortManagers={this.onSelectManagerFellowRatio}
          sortRatio={managerFellowSortRatio}
          managers={managers}
        />
      )
    );
  };

  mapDisplayContent = () => {
    const {
      averageFellowsPerTtl,
      isEngineeringManager,
      averageFellowsPerLf
    } = this.state;
    return [
      {
        title: isEngineeringManager ? 'TTL to FELLOW MAP' : 'LF to FELLOW MAP',
        text: isEngineeringManager
          ? 'Average TTL to Fellow ratio'
          : 'Average LF to Fellow ratio',
        averageValue: isEngineeringManager
          ? averageFellowsPerTtl
          : averageFellowsPerLf
      }
    ];
  };

  render() {
    const emDashboardStyle = {
      paddingLeft: '0',
      paddingRight: '0',
      paddingBottom: '49px'
    };

    const { fellowsSummary, user } = this.props;

    const {
      ttls,
      lfs,
      isEngineeringManager,
      managerTitle,
      showChart,
      totalFellows
    } = this.state;

    const chartData = fellowsSummary.summary;

    return (
      <div className="container-fluid" style={emDashboardStyle}>
        <TtlsFellowSummary
          fellowsSummary={this.mapDisplayFellowSummary(
            isEngineeringManager ? ttls : lfs,
            totalFellows,
            managerTitle
          )}
          handleCardClick={this.handleCardClick}
        />

        {showChart && (
          <FellowChart
            handleChartClose={this.handleChartClose}
            data={chartData}
            user={user}
          />
        )}

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
        {this.renderManagerFellowMap()}
      </div>
    );
  }
}

EngineeringManagerDashboard.propTypes = {
  // required prop-types
  fellowsSummary: PropTypes.shape({}).isRequired,
  fetchFellowsSummaryEm: PropTypes.func.isRequired,
  fetchFellowsSummarySl: PropTypes.func.isRequired,
  fetchFellowsSummaryLf: PropTypes.func.isRequired,
  fetchFellowsSummaryTtl: PropTypes.func.isRequired,
  user: PropTypes.arrayOf.isRequired,
  getEngineeringManagerTtls: PropTypes.func.isRequired,
  getSimulationsLeadLfs: PropTypes.func.isRequired
};

export default EngineeringManagerDashboard;
