import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import RoleDetailsLeft from '../../../components/RoleDetailsLeft';
import RoleDetailsRight from '../../../components/RoleDetailsRight';
import ReturnButton from '../../../components/Buttons/ReturnButton';
import RoleApplication from '../RoleApplication';
import PMLoader from '../../../components/CustomLoader/PMLoader';

import './ProjectRoleDetails.scss';

const ProjectRoleDetails = ({
  match,
  history,
  singleProject,
  AllVacantRoles,
  getAProject,
  d1Engineer,
  fetchAllVacancies
}) => {
  const { roleId, projectId, vacancyId } = match.params;

  const vacanciesAreNotAvailable = () =>
    !!Object.keys(AllVacantRoles).length < 1;

  useEffect(() => {
    if (vacanciesAreNotAvailable()) {
      fetchAllVacancies();
    }
    if (Object.keys(singleProject).length < 1) {
      getAProject(Number(projectId));
    }
    // eslint-disable-next-line
  }, []);

  const currentRole = AllVacantRoles.find(
    vacancy =>
      vacancy.role.id === Number(roleId) &&
      Number(vacancy.project.id) === Number(projectId)
  );
  const { params } = match;

  return Object.keys(singleProject).length > 1 ? (
    <div className="role-details-container">
      <ReturnButton history={history} />
      <p>Back to Dashboard</p>
      <RoleDetailsLeft projectInfo={singleProject} roleInfo={currentRole} />
      <RoleApplication
        roleId={params.roleId}
        history={history}
        projectId={params.projectId}
        roleInfo={currentRole.role}
        projectTitle={singleProject.name}
        cycleId={currentRole.vacancy.cycle_id}
      />
      <RoleDetailsRight
        projectInfo={singleProject}
        roleInfo={currentRole}
        engineer={d1Engineer}
        vacancyId={vacancyId}
        cycleId={currentRole.vacancy.cycle_id}
      />
    </div>
  ) : (
    <PMLoader />
  );
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
  getAProject: PropTypes.func,
  fetchAllVacancies: PropTypes.func.isRequired
};

export default ProjectRoleDetails;
