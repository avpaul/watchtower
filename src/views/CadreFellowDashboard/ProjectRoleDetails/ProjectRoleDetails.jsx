import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import RoleDetailsLeft from '../../../components/RoleDetailsLeft';
import RoleDetailsRight from '../../../components/RoleDetailsRight';
import ReturnButton from '../../../components/Buttons/ReturnButton';

import './ProjectRoleDetails.scss';

const ProjectRoleDetails = ({
  match,
  history,
  singleProject,
  AllVacantRoles,
  getAProject
}) => {
  const { roleId, projectId } = match.params;
  useEffect(() => {
    getAProject(projectId);
    // eslint-disable-next-line
  }, []);

  const currentRole = AllVacantRoles.find(
    data => data.role.id === Number(roleId)
  );

  return singleProject.data.project ? (
    <div className="role-details-container">
      <ReturnButton history={history} />
      <p>Back to Dashboard</p>
      <RoleDetailsLeft
        projectInfo={singleProject.data.project}
        roleInfo={currentRole.role}
      />
      <RoleDetailsRight
        projectInfo={singleProject.data.project}
        roleInfo={currentRole.role}
      />
    </div>
  ) : null;
};

ProjectRoleDetails.defaultProps = {
  singleProject: {},
  AllVacantRoles: [],
  getAProject: () => ''
};

ProjectRoleDetails.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  singleProject: PropTypes.shape(),
  AllVacantRoles: PropTypes.arrayOf(PropTypes.shape()),
  getAProject: PropTypes.func
};

export default ProjectRoleDetails;
