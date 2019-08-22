import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PMloader from '../../../components/CustomLoader/PMLoader';
import MapProjectApplications from './MapProjectApplications';
import './Applications.scss';

export default class Applications extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { fetchApplications } = this.props;
    fetchApplications();
  }

  render() {
    const {
      applications: {
        data: { pending: pendingApplications = [] },
        loading
      }
    } = this.props;

    return loading ? (
      <div className="cadre__page">
        <PMloader />
      </div>
    ) : (
      <div className="cadre__page">
        {<MapProjectApplications applications={pendingApplications} />}
      </div>
    );
  }
}

Applications.propTypes = {
  applications: PropTypes.shape().isRequired,
  fetchApplications: PropTypes.func.isRequired
};
