import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapProjectCertCard from '../../../../components/MapProjectRoleCard';
import PMloader from '../../../../components/CustomLoader/PMLoader';

import '../../RolesDashboard/CadreViewRoles/CadreViewRoles.scss';

export default class CadreViewCerts extends Component {
  componentDidMount() {
    const { fetchAllCertifications } = this.props;
    if (!['production', 'staging'].includes(process.env.NODE_ENV))
      fetchAllCertifications();
  }

  render() {
    const {
      allCertifications: { data, loading }
    } = this.props;

    return loading ? (
      <div className="cadre__page">
        <PMloader />
      </div>
    ) : (
      <div className="cadre__page">
        <MapProjectCertCard roleData={data} type="certificates" />
      </div>
    );
  }
}

CadreViewCerts.propTypes = {
  allCertifications: PropTypes.shape(),
  fetchAllCertifications: PropTypes.func.isRequired
};

CadreViewCerts.defaultProps = {
  allCertifications: {}
};