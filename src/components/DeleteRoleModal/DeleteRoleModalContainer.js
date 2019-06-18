import { connect } from 'react-redux';
import DeleteRoleModal from './DeleteRoleModal';
import { deleteRoleRequest } from '../../redux/actionCreators/cadreProjectRoleActions';

export default connect(null, { deleteRoleRequest })(DeleteRoleModal);
