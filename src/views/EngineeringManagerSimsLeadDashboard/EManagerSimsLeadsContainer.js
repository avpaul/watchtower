import { connect } from 'react-redux';
import EManagerSimsLeadsDashboard from './EManagerSimsLeadsDashboard';
import {
  fetchFellowsSummaryEm,
  fetchFellowsSummarySl,
  fetchFellowsSummaryLf,
  fetchFellowsSummaryTtl
} from '../../redux/actionCreators/fellowsSummaryActions/fellowsSummaryActions';
import getEmsSimsLeadsActions from '../../redux/actionCreators/getEmsSimsLeadsActions';

export const mapStateToProps = ({
  engineeringManagerSimsLeads,
  emsDashboard
}) => ({
  loading: engineeringManagerSimsLeads.loading,
  data: engineeringManagerSimsLeads.data,
  error: engineeringManagerSimsLeads.error,
  fellowsSummary: emsDashboard.fellowsSummary
});

export default connect(
  mapStateToProps,
  {
    fetchFellowsSummaryEm,
    getEmsSimsLeadsActions,
    fetchFellowsSummarySl,
    fetchFellowsSummaryLf,
    fetchFellowsSummaryTtl
  }
)(EManagerSimsLeadsDashboard);
