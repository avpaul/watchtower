import { connect } from 'react-redux';
import DeleteProjectModal from './DeleteProjectModal';
import { deleteProject } from '../../../../redux/actionCreators/projectsActions';

export default connect(null, { deleteProject })(DeleteProjectModal);




