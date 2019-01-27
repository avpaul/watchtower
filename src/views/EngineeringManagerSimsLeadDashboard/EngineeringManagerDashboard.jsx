import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DisplayCard from '../../components/Filters/DisplayCard';
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
      ttls: [],
      show: false,
      displayManagers: 'TTL',
      managerFellowSortRatio: 'HIGH_TO_LOW'
    };
    this.onSelectManagerFellowRatio = this.onSelectManagerFellowRatio.bind(
      this
    );
  }

  componentDidMount() {
    const { getEngineeringManagerTtls, user } = this.props;
    const { email } = user;
    if (user.roles.WATCH_TOWER_EM) {
      getEngineeringManagerTtls(email).then(data => {
        if (!data.error) {
          this.setState({
            averageFellowsPerTtl: data.data.averageFellowsPerTtl,
            isEngineeringManager: true,
            ttls: data.data.engineeringManager.ttls
          });
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

  mapDisplayFellowSummary = (ttlsArrays, totalFellows) => {
    const titleName = 'TTL - ';
    const displayList = [
      {
        id: 'total-fellows-card',
        title: 'Total D0 Fellows',
        subTitle: 'Click to see details',
        totalFellows: `${totalFellows === undefined ? 0 : totalFellows}`
      }
    ];
    for (let i = 0; i < ttlsArrays.length; i += 1) {
      const content = {
        title: titleName.concat(
          ttlsArrays[i].firstName,
          ' ',
          ttlsArrays[i].lastName.substring(1, 0)
        ),
        totalFellows: ttlsArrays[i].fellowsCount
      };
      displayList.push(content);
    }
    return displayList;
  };

  fellowMapOnClick = event => {
    if (event.currentTarget.id === '0')
      this.setState({ displayManagers: 'TTL', show: true });
    else this.setState({ displayManagers: 'LF', show: true });
  };

  handleMapClose = () => {
    this.setState({ show: false });
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

  renderManagerFellowMap = () => {
    const {
      show,
      managerFellowSortRatio,
      displayManagers,
      lfs,
      ttls
    } = this.state;
    const [managers, style] =
      displayManagers === 'TTL'
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

  render() {
    const emDashboardStyle = {
      paddingLeft: '0',
      paddingRight: '0',
      paddingBottom: '49px'
    };
    const { data } = this.props;
    const ttls = data.length !== 0 ? data.engineeringManager.ttls : '';
    const { totalFellows } = data.length !== 0 ? data : '';
    return (
      <div className="container-fluid" style={emDashboardStyle}>
        <TtlsFellowSummary
          fellowsSummary={this.mapDisplayFellowSummary(ttls, totalFellows)}
        />
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
  data: PropTypes.arrayOf.isRequired,
  user: PropTypes.arrayOf.isRequired,
  getEngineeringManagerTtls: PropTypes.func.isRequired
};

export default EngineeringManagerDashboard;
