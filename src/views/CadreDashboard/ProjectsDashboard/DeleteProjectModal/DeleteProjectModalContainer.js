import { connect } from 'react-redux';
import DeleteProjectModal from './DeleteProjectModal';
import { deleteProjectRequest } from '../../../../redux/actionCreators/projectsActions';

export default connect(null, { deleteProjectRequest })(DeleteProjectModal);




