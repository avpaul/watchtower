import { connect } from 'react-redux';
import ViewProjects from './ViewProjects';
import { fetchAllProjects } from '../../redux/actionCreators/projectsActions';

export const mapStateToProps = ({ allProjects }) => ({
  allProjects
});

export default connect(
  mapStateToProps,
  {
    fetchAllProjects
  }
)(ViewProjects);
