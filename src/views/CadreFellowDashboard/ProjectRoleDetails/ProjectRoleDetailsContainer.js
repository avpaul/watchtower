import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RolePage from './ProjectRoleDetails';

import { getAProject } from '../../../redux/actionCreators/projectsActions';

export const mapStateToProps = ({ singleProject, cadreVacancies }) => ({
  singleProject,
  AllVacantRoles: cadreVacancies.data.projectVacancies
});

export default connect(
  mapStateToProps,
  {
    getAProject
  }
)(withRouter(RolePage));
