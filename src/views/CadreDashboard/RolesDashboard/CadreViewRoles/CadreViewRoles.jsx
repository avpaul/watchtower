import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapProjectRoleCard from '../../../../components/MapProjectRoleCard';
import PMloader from '../../../../components/CustomLoader/PMLoader';

import './CadreViewRoles.scss';

export default class CadreViewRoles extends Component {
  componentDidMount() {
    const { fetchAllRoles } = this.props;
    fetchAllRoles();
  }

  render() {
    const {
      allRoles: { data, loading },
      getActiveRoleEngineer,
      loading: loadActiveEngrs,
      activeEngineers
    } = this.props;
    return loading ? (
      <div className="cadre__page">
        <PMloader />
      </div>
    ) : (
      <div className="cadre__page">
        {
          <MapProjectRoleCard
            roleData={data}
            fetchActiveEngineers={getActiveRoleEngineer}
            loading={loadActiveEngrs}
            activeEngineers={activeEngineers}
          />
        }
      </div>
    );
  }
}

CadreViewRoles.propTypes = {
  allRoles: PropTypes.shape(),
  fetchAllRoles: PropTypes.func.isRequired,
  getActiveRoleEngineer: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  activeEngineers: PropTypes.oneOfType([
    PropTypes.instanceOf(Array),
    PropTypes.shape()
  ])
};

CadreViewRoles.defaultProps = {
  allRoles: {},
  activeEngineers: []
};
