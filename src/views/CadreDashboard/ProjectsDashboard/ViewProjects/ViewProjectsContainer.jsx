import { connect } from 'react-redux';
import ViewProjects from './ViewProjects';
import { fetchAllProjects, setDeleteTarget } from '../../../../redux/actionCreators/projectsActions';

export const mapStateToProps = ({ allProjects }) => ({
  allProjects
});

export default connect(
  mapStateToProps,
  {
    fetchAllProjects,
    setDeleteTarget
  }
)(ViewProjects);
