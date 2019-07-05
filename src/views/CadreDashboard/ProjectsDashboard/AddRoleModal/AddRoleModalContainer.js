import { connect } from 'react-redux';
import AddRoleModal from './AddRoleModal';
import {
  createNewRole,
  getRoleSkills
} from '../../../../redux/actionCreators/cadreProjectRoleActions';

export const mapStateToProps = ({ roleSkills, createRole }) => ({
  roleSkills,
  createRole
});

export default connect(
  mapStateToProps,
  {
    createNewRole,
    getRoleSkills
  }
)(AddRoleModal);
