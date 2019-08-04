import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import RoleDetailsLeft from '../../../components/RoleDetailsLeft';
import RoleDetailsRight from '../../../components/RoleDetailsRight';
import ReturnButton from '../../../components/Buttons/ReturnButton';
import RoleApplication from '../RoleApplication';

import './ProjectRoleDetails.scss';

const ProjectRoleDetails = ({
  match,
  history,
  singleProject,
  AllVacantRoles,
  getAProject,
  d1Engineer
}) => {
  const { roleId, projectId, vacancyId } = match.params;
  useEffect(() => {
    getAProject(projectId);
    // eslint-disable-next-line
  }, []);

  const currentRole = AllVacantRoles.find(
    data => data.role.id === Number(roleId)
  );
  const { params } = match;

  return singleProject.data.project ? (
    <div className="role-details-container">
      <ReturnButton history={history} />
      <p>Back to Dashboard</p>
      <RoleDetailsLeft
        projectInfo={singleProject.data.project}
        roleInfo={currentRole.role}
      />
      <RoleApplication
        roleId={params.roleId}
        history={history}
        projectId={params.projectId}
        roleInfo={currentRole.role}
      />
      <RoleDetailsRight
        projectInfo={singleProject.data.project}
        roleInfo={currentRole.role}
        engineer={d1Engineer}
        vacancyId={vacancyId}
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
  d1Engineer: PropTypes.shape().isRequired,
  AllVacantRoles: PropTypes.arrayOf(PropTypes.shape()),
  getAProject: PropTypes.func
};

export default ProjectRoleDetails;
