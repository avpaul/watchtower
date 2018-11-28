import { connect } from 'react-redux';

import ProjectsSummary from './ProjectsSummary';

export const mapStateToProps = state => ({
  ttlProjects: state.ttlProjects
});

export default connect(mapStateToProps)(ProjectsSummary);
