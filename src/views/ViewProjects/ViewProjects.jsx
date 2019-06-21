import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapProjectCards from '../../components/MapProjectCards';
import PMloader from '../../components/CustomLoader/PMLoader';

class ViewProjects extends Component {
  componentDidMount() {
    const { fetchAllProjects } = this.props;
    fetchAllProjects();
  }

  render() {
    const { allProjects } = this.props;
    return (
      <div className="cadre__page">
        {allProjects.loading ? (
          <PMloader />
        ) : (
          <MapProjectCards projectData={allProjects.data} />
        )}
      </div>
    );
  }
}

ViewProjects.propTypes = {
  allProjects: PropTypes.shape(),
  fetchAllProjects: PropTypes.func.isRequired
};

ViewProjects.defaultProps = {
  allProjects: {}
};

export default ViewProjects;
