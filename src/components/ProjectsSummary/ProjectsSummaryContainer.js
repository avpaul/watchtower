import { connect } from 'react-redux';

import ProjectsSummary from './ProjectsSummary';

export const mapStateToProps = state => ({
  ttlProjects: state.ttlProjects,
  fellowsSummary: state.fellowsSummary,
  loading: state.fellowsSummary.loading
});

export default connect(mapStateToProps)(ProjectsSummary);
