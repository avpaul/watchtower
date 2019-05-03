import { connect } from 'react-redux';
import activatePip from '../../redux/actionCreators/pipActivationActions';
import PipActivation from './PipActivationForm';

export const mapStateToProps = ({ pipData }) => ({
  data: pipData.data,
  loading: pipData.loading,
  error: pipData.error
});

export default connect(
  mapStateToProps,
  { activatePip }
)(PipActivation);
