import { connect } from 'react-redux';
import ProjectDetails from './ProjectDetails';

export const mapStateToProps = ({ allProjects }) => ({
  allProjects
});

export default connect(mapStateToProps)(ProjectDetails);
