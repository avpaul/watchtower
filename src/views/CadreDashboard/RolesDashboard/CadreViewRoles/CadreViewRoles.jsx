import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapProjectRoleCard from '../../../../components/MapProjectRoleCard';
import Loader from '../../../../components/Loader/Loader';

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
      <div className="role-dashboard__loader">
        <Loader />
      </div>
    ) : (
      <div className="cadre__page">
        <MapProjectRoleCard roleData={data} />
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
