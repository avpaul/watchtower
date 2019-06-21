import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapProjectRoleCard from '../../../../components/MapProjectRoleCard';
import PMloader from '../../../../components/CustomLoader/PMLoader';

import './CadreViewRoles.css';

export default class CadreViewRoles extends Component {
  componentDidMount() {
    const { fetchAllRoles } = this.props;
    fetchAllRoles();
  }

  render() {
    const {
      allRoles: { data, loading }
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
  fetchAllRoles: PropTypes.func.isRequired
};

CadreViewRoles.defaultProps = {
  allRoles: {}
};
