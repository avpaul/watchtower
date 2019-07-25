import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FellowRolesCard from '../../../../components/FellowRolesCard/FellowRolesCard';
import Loader from '../../../../components/Loader/Loader';
import Modal from '../../../../components/LargeModal/LargeModal';

class ViewCertificationApplicantsModal extends Component {
  componentDidMount() {
    const { certificationId, fetchCertificationApplicants } = this.props;
    fetchCertificationApplicants(certificationId);
  }

  render() {
    const {
      toggle,
      open,
      certificationApplicants: { loading, data },
      title
    } = this.props;

    return (
      <Modal
        handleClose={toggle}
        show={open}
        size="large"
        title={`Applicants for ${title}`}
      >
        {loading ? (
          <Loader size="large" />
        ) : (
          <div className="modal__body-card">
            {data.applicants &&
              data.applicants.map(applicant => (
                <FellowRolesCard key={applicant.id} role={applicant} />
              ))}
          </div>
        )}
      </Modal>
    );
  }
}

ViewCertificationApplicantsModal.propTypes = {
  certificationApplicants: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    data: PropTypes.instanceOf(Object).isRequired
  }),
  fetchCertificationApplicants: PropTypes.func.isRequired,
  certificationId: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

ViewCertificationApplicantsModal.defaultProps = {
  certificationApplicants: {
    loading: false,
    data: {}
  }
};

export default ViewCertificationApplicantsModal;
