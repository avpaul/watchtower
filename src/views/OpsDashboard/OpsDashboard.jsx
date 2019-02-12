import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FellowsSummaryChart from '../../components/FellowsSummaryChart';
import ManagerFellowMap from '../../components/ManagerFellowMap';
import { FellowsProgressConnected } from './FellowsProgress';
import DisplayCard from '../../components/Filters/DisplayCard';

/**
 * Class representing Ops Dashboard Page
 * @class
 */

class OpsDashboardMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ttls: [],
      lfs: [],
      show: false,
      displayManagers: 'LF',
      averageFellowsPerLf: '0',
      averageFellowsPerTtl: '0',
      managerFellowSortRatio: 'HIGH_TO_LOW'
    };
    this.onSelectManagerFellowRatio = this.onSelectManagerFellowRatio.bind(
      this
    );
  }

  componentDidMount() {
    const {
      getManagers,
      ttls,
      lfs,
      averageFellowsPerLf,
      averageFellowsPerTtl
    } = this.props;

    // checks store for ttl/lfs before API call
    if (ttls[0])
      this.setState({ lfs, ttls, averageFellowsPerLf, averageFellowsPerTtl });
    else
      getManagers().then(data => {
        if (!data.error) {
          this.setState({
            lfs: data.managers.lfs,
            ttls: data.managers.ttls,
            averageFellowsPerLf: data.managers.averageFellowsPerLf,
            averageFellowsPerTtl: data.managers.averageFellowsPerTtl
          });
        }
      });
  }

  onSelectManagerFellowRatio(type, value) {
    const sortRatio = value
      .slice(-11)
      .replace(/\s/g, '_')
      .toUpperCase();
    this.setState({ managerFellowSortRatio: sortRatio });
  }

  mapDisplayContent = () => {
    const { averageFellowsPerLf, averageFellowsPerTtl } = this.state;
    return [
      {
        title: 'LF to FELLOW MAP',
        text: 'Average LF to Fellow ratio',
        averageValue: averageFellowsPerLf
      },
      {
        title: 'TTL to FELLOW MAP',
        text: 'Average TTL to Fellow ratio',
        averageValue: averageFellowsPerTtl
      }
    ];
  };

  fellowMapOnClick = event => {
    if (event.currentTarget.id === '0')
      this.setState({ displayManagers: 'LF', show: true });
    else this.setState({ displayManagers: 'TTL', show: true });
  };

  handleMapClose = () => {
    this.setState({ show: false });
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
    const opsDashboardStyle = {
      paddingLeft: '0',
      paddingRight: '0',
      paddingBottom: '49px'
    };

    const { user } = this.props;

    // Add components here for opsDashboard
    return (
      <div className="container-fluid" style={opsDashboardStyle}>
        <FellowsSummaryChart user={user} />
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
        <FellowsProgressConnected />
      </div>
    );
  }
}

const managerPropTypes = {
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  roleId: PropTypes.number.isRequired,
  staffId: PropTypes.string.isRequired,
  fellows: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object
      ])
    )
  )
};

OpsDashboardMain.propTypes = {
  ttls: PropTypes.arrayOf(
    PropTypes.shape({
      ...managerPropTypes
    })
  ).isRequired,
  lfs: PropTypes.arrayOf(
    PropTypes.shape({
      ...managerPropTypes
    })
  ).isRequired,
  averageFellowsPerTtl: PropTypes.number.isRequired,
  averageFellowsPerLf: PropTypes.number.isRequired,
  getManagers: PropTypes.func.isRequired,
  user: PropTypes.arrayOf.isRequired
};

export default OpsDashboardMain;
