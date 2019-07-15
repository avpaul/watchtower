import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cautionMark from '../../static/MarkDanger.svg';
import './DeleteRoleModal.scss';

class DeleteRoleModal extends Component {
  handleClick = () => {
    const { deleteRoleRequest } = this.props;
    deleteRoleRequest();
  };

  renderModalHeader = () => (
    <div className="modal-header">
      <span className="modal-title text-danger">
        <img src={cautionMark} alt="delete role warning icon" />
        Delete Role ?
      </span>
      <button
        type="button"
        className="close"
        data-dismiss="modal"
        aria-label="Close"
      >
        <span aria-hidden="false">&times;</span>
      </button>
    </div>
  );

  renderModalFooter = () => (
    <div className="modal-footer delete-footer">
      <button type="button" className="btn" data-dismiss="modal">
        No
      </button>
      <button
        type="button"
        onClick={this.handleClick}
        data-dismiss="modal"
        className="btn deleteBtn"
      >
        Yes, Delete
      </button>
    </div>
  );

  render() {
    return (
      <div>
        <div
          className="modal fade"
          id="delete-role-modal"
          roled="dialog"
          aria-labelledby="deleteRole"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content h-auto">
              {this.renderModalHeader()}
              <div className="modal-body">
                Are you sure you want to delete this role?
              </div>
              {this.renderModalFooter()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DeleteRoleModal.propTypes = {
  deleteRoleRequest: PropTypes.func.isRequired
};

export default DeleteRoleModal;
