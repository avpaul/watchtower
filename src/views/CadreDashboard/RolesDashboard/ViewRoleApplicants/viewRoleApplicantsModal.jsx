import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FellowRolesCard from '../../../../components/FellowRolesCard/FellowRolesCard';
import Loader from '../../../../components/Loader/Loader';
import Modal from '../../../../components/LargeModal/LargeModal';

class ViewRoleApplicantsModal extends Component {
  componentDidMount() {
    const { roleId, getARole } = this.props;
    getARole(roleId);
  }

  render() {
    const { toggle, open, loading } = this.props;
    const { data, title } = this.props;

    return (
      <Modal
        handleClose={toggle}
        show={open}
        size="large"
        title={`Applicants for ${title}`}
      >
        {loading ? (
          <Loader size="large" testId="loading-indicator" />
        ) : (
          <div className="modal__body-card">
            {data.applications &&
              data.applications.map(application => (
                <FellowRolesCard
                  key={application.applicant.id}
                  role={application.applicant}
                />
              ))}
          </div>
        )}
      </Modal>
    );
  }
}

ViewRoleApplicantsModal.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.instanceOf(Object),
  getARole: PropTypes.func.isRequired,
  roleId: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

ViewRoleApplicantsModal.defaultProps = {
  loading: false,
  data: {}
};

export default ViewRoleApplicantsModal;
