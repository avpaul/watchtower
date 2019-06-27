import { connect } from 'react-redux';
import ReportsDashboard from './ReportsDashboard';
import fetchEngineersReportActions from '../../../redux/actionCreators/engineersReportActions';
import { fetchAllRoles } from '../../../redux/actionCreators/cadreProjectRoleActions';
import { $perPage, $page } from '../../../redux/actionCreators/paginate';

/**
 * map state to props or updates the
 * component with infomation from the store
 * using the action creators
 * @param  {*} object
 * @return {void}
 */
const mapStateToProps = ({ reports, allRoles }) => ({
  engineersReport: reports,
  metaData: reports.meta,
  cadreroles: allRoles.data,
  loading: reports.loading
});

/**
 * connects the main component to the store
 */
export default connect(
  mapStateToProps,
  {
    fetchAllRoles,
    fetchEngineersReportActions,
    $perPage,
    $page
  }
)(ReportsDashboard);
