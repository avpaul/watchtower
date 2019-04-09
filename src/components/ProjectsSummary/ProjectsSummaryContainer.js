import { connect } from 'react-redux';

import ProjectsSummary from './ProjectsSummary';

export const mapStateToProps = ({ manager, fellowsSummary }) => ({
  manager,
  fellowsSummary
});

export default connect(mapStateToProps)(ProjectsSummary);
