import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CadreDeletionModal from '../../../../components/CadreDeletionModal';

/**
 * This makes use of the re-usable CadreDeletionModal imported 👆🏾
 */
class DeleteProjectModal extends Component {
  handleProjectDeletion = () => {
    const { deleteProject } = this.props;
    deleteProject();
  };

  render() {
    return (
      <CadreDeletionModal handleClick={this.handleProjectDeletion} targetName="project" />
    );
  }
}

DeleteProjectModal.propTypes = {
  deleteProject: PropTypes.func.isRequired
};

export default DeleteProjectModal;
