import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FellowRolesCard from '../../../../components/FellowRolesCard/FellowRolesCard';
import Loader from '../../../../components/Loader/Loader';
import Modal from '../../../../components/LargeModal/LargeModal';

class ViewCertificationApplicantsModal extends Component {
  componentDidMount() {
    const { certificationId, fetchCertifiedEngineers } = this.props;
    fetchCertifiedEngineers(certificationId);
  }

  render() {
    const {
      toggle,
      open,
      certifiedEngineers: { loading, data },
      title
    } = this.props;

    return (
      <Modal
        handleClose={toggle}
        show={open}
        size="large"
        title={`Engineers certified in ${title}`}
      >
        {loading ? (
          <Loader size="large" />
        ) : (
          <div className="modal__body-card">
            {data &&
              data.map(applicant => (
                <FellowRolesCard key={applicant.id} role={applicant} />
              ))}
          </div>
        )}
      </Modal>
    );
  }
}

ViewCertificationApplicantsModal.propTypes = {
  certifiedEngineers: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    data: PropTypes.instanceOf(Object).isRequired
  }),
  fetchCertifiedEngineers: PropTypes.func.isRequired,
  certificationId: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

ViewCertificationApplicantsModal.defaultProps = {
  certifiedEngineers: {
    loading: false,
    data: {}
  }
};

export default ViewCertificationApplicantsModal;
