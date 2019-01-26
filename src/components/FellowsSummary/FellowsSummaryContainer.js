import { connect } from 'react-redux';

import FellowsSummary from './FellowsSummary';

export const mapStateToProps = state => ({
  fellowsSummary: state.opsDashboard.fellowsSummary
});

export default connect(mapStateToProps)(FellowsSummary);
