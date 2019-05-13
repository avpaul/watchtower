import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FellowsSummaryChart from '../../components/FellowsSummaryChart';
import ManagerFellowMap from '../../components/ManagerFellowMap';
import { FellowsProgressConnected } from './FellowsProgress';
import FellowRatio from '../../components/ManagerFellowMap/FellowRatio';

/**
 * Class representing Ops Dashboard Page
 * @class
 */

class OpsDashboardMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      displayManagers: 'LF',
      managerFellowSortRatio: 'HIGH_TO_LOW',
      sortLabel: 'Fellow Ratio, High to Low'
    };
    this.onSelectManagerFellowRatio = this.onSelectManagerFellowRatio.bind(
      this
    );
  }

  componentDidMount() {
    const { getOpsSummary } = this.props;
    getOpsSummary();
  }

  onSelectManagerFellowRatio(type, value) {
    const sortRatio = value
      .slice(-11)
      .replace(/\s/g, '_')
      .toUpperCase();
    this.setState({ managerFellowSortRatio: sortRatio, sortLabel: value });
  }

  mapDisplayContent = () => {
    const { averageFellowsPerLf, averageFellowsPerTtl } = this.props;
    return [
      {
        title: 'LF to FELLOW MAP',
        subTitle: 'Click to see details',
        text: 'Average LF to Fellow ratio',
        averageValue: parseInt(averageFellowsPerLf, 10)
      },
      {
        title: 'TTL to FELLOW MAP',
        subTitle: 'Click to see details',
        text: 'Average TTL to Fellow ratio',
        averageValue: parseInt(averageFellowsPerTtl, 10)
      }
    ];
  };

  fellowMapOnClick = event =>
    this.setState({
      displayManagers: event.currentTarget.id === '0' ? 'LF' : 'TTL',
      show: true
    });

  handleMapClose = () => this.setState({ show: false });

  renderManagerFellowMap = () => {
    const {
      show,
      managerFellowSortRatio,
      displayManagers,
      sortLabel
    } = this.state;
    const { lfs, ttls } = this.props;

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
          sortLabel={sortLabel}
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
        <FellowRatio
          mapDisplayContent={this.mapDisplayContent}
          fellowMapOnClick={this.fellowMapOnClick}
        />
        {this.renderManagerFellowMap()}
        <FellowsProgressConnected />
      </div>
    );
  }
}

const managerPropTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  staff_id: PropTypes.string.isRequired,
  fellows: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
        PropTypes.bool
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
  getOpsSummary: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired
};

export default OpsDashboardMain;
