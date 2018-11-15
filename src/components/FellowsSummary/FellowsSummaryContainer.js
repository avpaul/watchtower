import { connect } from 'react-redux';

import FellowsSummary from './FellowsSummary';
import { getFellowsSummary } from '../../redux/reducers/opsDashBoardReducer/fellowsSummaryReducer';

export const mapStateToProps = state => ({
  fellowsSummary: getFellowsSummary(state.opsDashboard)
});

export default connect(mapStateToProps)(FellowsSummary);
