import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FellowsSummaryChart from '../../components/FellowsSummaryChart';
import ManagerFellowMap from '../../components/ManagerFellowMap';

/**
 * Class representing Ops Dashboard Page
 * @class
 */
export class OpsDashboardMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ttls: [],
      lfs: [],
      show: true,
      displayManagers: 'LF',
      managerFellowSortRatio: 'HIGH_TO_LOW'
    };
  }

  componentDidMount() {
    const { getManagers, ttls, lfs } = this.props;

    // checks store for ttl/lfs before API call
    if (ttls[0]) this.setState({ lfs, ttls });
    else
      getManagers().then(data => {
        if (!data.error) {
          this.setState({ lfs: data.managers.lfs, ttls: data.managers.ttls });
        }
      });
  }

  onSelectManagerFellowRatio = event => {
    this.setState({ managerFellowSortRatio: event.target.value });
  };

  handleMapClose = () => {
    this.setState({ show: false });
  };

  render() {
    const {
      lfs,
      ttls,
      displayManagers,
      show,
      managerFellowSortRatio
    } = this.state;
    const [managers, style] =
      displayManagers === 'TTL'
        ? [ttls, { '--arrow-left-margin-style': '25%' }]
        : [lfs, { '--arrow-left-margin-style': '8%' }];
    return (
      <div className="container-fluid">
        <FellowsSummaryChart />
        {show && (
          <ManagerFellowMap
            arrowStyle={style}
            handleMapClose={this.handleMapClose}
            onSortManagers={this.onSelectManagerFellowRatio}
            sortRatio={managerFellowSortRatio}
            managers={managers}
          />
        )}
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
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    })
  )
};

OpsDashboardMain.propTypes = {
  ttls: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        ...managerPropTypes
      })
    )
  ).isRequired,
  lfs: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        ...managerPropTypes
      })
    )
  ).isRequired,
  getManagers: PropTypes.func.isRequired
};

export default OpsDashboardMain;
