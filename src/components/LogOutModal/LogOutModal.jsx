import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import cautionMark from '../../static/Mark.svg';
import authService from '../../services/auth';
import './LogOutModal.css';

class LogOutPage extends Component {
  state = {
    logout: false,
  };

  handleClick = () => {
    authService.logout();
    this.setState({ logout: true });
  }

  renderModalContent = () => (
    <div className="modal-content">
      <div className="modal-header">
        <span className="modal-title">
          <img src={cautionMark} alt="logout warning icon" />
          Logout ?
        </span>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="false">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        Are you sure you want to logout of WatchTower ?
      </div>
      <div className="modal-footer">
        <button type="button" className="btn" data-dismiss="modal">No</button>
        <button type="button" onClick={this.handleClick} data-dismiss="modal" className="btn">Yes, Logout</button>
      </div>
    </div>
  );

  render() {
    const { logout } = this.state;
    if (logout) return <Redirect to="/" />;
    return (
      <div>
        <div className="modal fade" id="logout-modal" roled="dialog" aria-labelledby="logoutModal" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            { this.renderModalContent() }
          </div>
        </div>
      </div>
    );
  }
}

export default LogOutPage;
