import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DisplayCard from '../../components/Filters/DisplayCard';
import FellowsSummaryChart from '../../components/FellowsSummaryChart';

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
      isEngineeringManager: true
    };
  }

  componentDidMount() {
    const { getEngineeringManagerTtls, user } = this.props;
    const email = user.email.split('@')[0].includes('wt-test-em')
      ? process.env.REACT_APP_DEFAULT_WATCHTOWER_EM_EMAIL
      : user.email;
    if (user.roles.WATCH_TOWER_EM) {
      getEngineeringManagerTtls(email).then(data => {
        if (!data.error) {
          this.setState({
            averageFellowsPerTtl: data.data.averageFellowsPerTtl,
            isEngineeringManager: true
          });
        }
      });
    }
  }

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
    const opsDashboardStyle = {
      paddingLeft: '0',
      paddingRight: '0',
      paddingBottom: '49px'
    };
    const { user } = this.props;
    // Add components here for EngineeringMangerDashboard
    return (
      <div className="container-fluid" style={opsDashboardStyle}>
        <FellowsSummaryChart displayByRole={user.roles} />
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
      </div>
    );
  }
}

EngineeringManagerDashboard.propTypes = {
  user: PropTypes.arrayOf.isRequired,
  getEngineeringManagerTtls: PropTypes.func.isRequired
};

export default EngineeringManagerDashboard;
