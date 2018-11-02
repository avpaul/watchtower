import { connect } from 'react-redux';

import DashboardPage from './DashboardPage';
import {
  getFellows,
  setVisibilityFilter
} from '../../redux/actionCreators/fellowActions';

export const mapStateToProps = ({ fellows, visibilityFilter }) => ({
  fellows: fellows.fellows,
  loading: fellows.loading,
  results: fellows.results,
  error: fellows.error,
  pagination: fellows.pagination,
  summary: fellows.summary,
  filter: visibilityFilter
});

export default connect(
  mapStateToProps,
  { getFellows, setVisibilityFilter }
)(DashboardPage);
