import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapProjectRoleCard from '../../../../components/MapProjectRoleCard';
import PMloader from '../../../../components/CustomLoader/PMLoader';

import './CadreViewRoles.scss';
import DeleteRoleModal from '../DeleteRoleModal';

export default class CadreViewRoles extends Component {
  componentDidMount() {
    const { fetchAllRoles, fetchAllProjects } = this.props;
    fetchAllRoles();
    fetchAllProjects();
  }

  render() {
    const {
      allRoles: { data, loading },
      allProjects,
      getActiveRoleEngineer,
      setDeleteTarget,
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
            projects={allProjects}
            type="role"
            fetchActiveEngineers={getActiveRoleEngineer}
            loading={loadActiveEngrs}
            activeEngineers={activeEngineers}
            setDeleteTarget={setDeleteTarget}
          />
        }

        <DeleteRoleModal />
      </div>
    );
  }
}

CadreViewRoles.propTypes = {
  allRoles: PropTypes.shape(),
  allProjects: PropTypes.arrayOf(PropTypes.shape({})),
  fetchAllRoles: PropTypes.func.isRequired,
  fetchAllProjects: PropTypes.func.isRequired,
  getActiveRoleEngineer: PropTypes.func.isRequired,
  setDeleteTarget: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  activeEngineers: PropTypes.oneOfType([
    PropTypes.instanceOf(Array),
    PropTypes.shape()
  ])
};

CadreViewRoles.defaultProps = {
  allRoles: {},
  activeEngineers: [],
  allProjects: []
};
