import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PMloader from '../../../../components/CustomLoader/PMLoader';
import MapProjectCards from '../../../../components/MapProjectCards';
import DeleteProjectModal from '../DeleteProjectModal';

class ViewProjects extends Component {
  componentDidMount() {
    const { fetchAllProjects, allProjects } = this.props;
    if (!allProjects.data.length) {
      fetchAllProjects();
    }
  }

  render() {
    const { allProjects, setDeleteTarget } = this.props;
    return (
      <div className="cadre__page">
        {allProjects.loading ? (
          <PMloader />
        ) : (
          <>
            <MapProjectCards
              projectData={allProjects.data}
              setDeleteTarget={setDeleteTarget}
            />
            <DeleteProjectModal />
          </>
        )}
      </div>
    );
  }
}

ViewProjects.propTypes = {
  allProjects: PropTypes.shape(),
  fetchAllProjects: PropTypes.func.isRequired,
  setDeleteTarget: PropTypes.func.isRequired
};

ViewProjects.defaultProps = {
  allProjects: {}
};

export default ViewProjects;
