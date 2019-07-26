import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CadreDeletionModal from '../../../../components/CadreDeletionModal';

/**
 * This makes use of the re-usable CadreDeletionModal imported 👆🏾
 */
class DeleteRoleModal extends Component {
  handleClick = () => {
    const { deleteRoleRequest } = this.props;
    deleteRoleRequest();
  };

  render() {
    return (
      <CadreDeletionModal handleClick={this.handleClick} targetName="role" />
    );
  }
}

DeleteRoleModal.propTypes = {
  deleteRoleRequest: PropTypes.func.isRequired
};

export default DeleteRoleModal;
