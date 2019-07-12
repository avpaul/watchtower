import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapProjectCertCard from '../../../../components/MapProjectRoleCard';
import PMloader from '../../../../components/CustomLoader/PMLoader';

import '../../RolesDashboard/CadreViewRoles/CadreViewRoles.scss';
import AddCertificationModal from '../CadreAddCertification/AddCertificationModal';

export default class CadreViewCerts extends Component {
  componentDidMount() {
    const { fetchAllCertifications } = this.props;
    fetchAllCertifications();
  }

  render() {
    const {
      allCertifications: { data, loading },
      history
    } = this.props;

    return loading ? (
      <div className="cadre__page">
        <PMloader />
      </div>
    ) : (
      <div className="cadre__page">
        <AddCertificationModal history={history} />
        <MapProjectCertCard roleData={data} type="certificates" />
      </div>
    );
  }
}

CadreViewCerts.propTypes = {
  allCertifications: PropTypes.shape(),
  fetchAllCertifications: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired
};

CadreViewCerts.defaultProps = {
  allCertifications: {}
};
