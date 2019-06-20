import { connect } from 'react-redux';
import AddManagerModal from './AddManagerModal';
import { addProjectManager } from '../../../../redux/actionCreators/projectManagerActions';

export const mapStateToProps = ({ fetchProjectManagers }) => ({
  fetchProjectManagers
});

export default connect(
  mapStateToProps,
  {
    addProjectManager
  }
)(AddManagerModal);
