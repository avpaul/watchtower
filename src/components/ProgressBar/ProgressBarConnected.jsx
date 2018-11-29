import { connect } from 'react-redux';
import ProgressBar from '.';

const mapStateToProps = ({ fellow }) => ({
  fellow
});

export default connect(
  mapStateToProps,
  {}
)(ProgressBar);
