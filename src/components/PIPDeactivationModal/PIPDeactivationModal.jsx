import React, { Component } from 'react';
import './PIPDeactivationModal.scss';
import PropTypes from 'prop-types';

class PIPDeactivationModal extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { fellowId, deactivatePIPAction, history } = this.props;
    deactivatePIPAction(fellowId, history);
  }

  renderDeactivateModalContent = () => (
    <div className="modal-content">
      <div className="modal-header">
        <span className="modal-title">Deactivate PIP?</span>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="false">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        Are you sure you want to deactivate PIP ?
      </div>
      <div className="modal-footer">
        <button type="button" className="btn" data-dismiss="modal">
          No
        </button>
        <button
          type="button"
          onClick={this.handleClick}
          data-dismiss="modal"
          className="btn"
        >
          Yes, Deactivate PIP
        </button>
      </div>
    </div>
  );

  render() {
    return (
      <div>
        <div
          className="modal fade"
          id="pipDeactivation-modal"
          roled="dialog"
          aria-labelledby="pipdeactivationModal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            {this.renderDeactivateModalContent()}
          </div>
        </div>
      </div>
    );
  }
}

PIPDeactivationModal.propTypes = {
  fellowId: PropTypes.string.isRequired,
  deactivatePIPAction: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired
};
export default PIPDeactivationModal;
