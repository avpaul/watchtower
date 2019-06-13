import { connect } from 'react-redux';
import AddManagerModal from './AddManagerModal';
import { addProjectManager } from '../../../../redux/actionCreators/projectManagerActions';

export const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  {
    addProjectManager
  }
)(AddManagerModal);
