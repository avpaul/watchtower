import { connect } from 'react-redux';
import FellowsSummary from './FellowsSummary';

export const mapStateToProps = ({ opsSummary }) => ({
  fellowsSummary: opsSummary.data.fellowsCount
});

export default connect(mapStateToProps)(FellowsSummary);
