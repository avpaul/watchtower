import React from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import MapAreasOfConcernData from '../MapSupportField/MapAreasOfConcernData';
import MapManagementSupportFields from '../MapSupportField/MapManagementSupportFields';
import { renderInputLabels } from '../AreaOfConcernInput/AreaOfConcernInput';
import CalendarInput from '../CalendarInput/CalendarInput';
import captureFellowDetails from './captureFellowDetails';

export const FormHeaders = (fellowName, department) => (
  <div className="row">
    <div className="form-group fellow-details-body col-md-4">
      {renderInputLabels('Fellow Name')}
      {captureFellowDetails(fellowName)}
    </div>
    <div className="form-group fellow-details-body col-md-4">
      {renderInputLabels('Department')}
      {captureFellowDetails(department)}
    </div>
  </div>
);

export const SuportFields = (
  mgtSupportFieldCount,
  handleMgtInputChange,
  addManagementSupport
) => (
  <div className="row" id="addSupport">
    <div className="form-group mgt-support-body col-12">
      <div className="pip-activation-form-label">Management Support</div>
      <MapManagementSupportFields
        mgtSupportFieldCount={mgtSupportFieldCount}
        handleMgtInputChange={handleMgtInputChange}
      />
      <button
        type="submit"
        className="btn btn-add-support"
        id="addSupportButton"
        name="addSupport"
        onClick={addManagementSupport}
      >
        Add Support
      </button>
    </div>
  </div>
);

export const PipPeriod = handlePipPeriod => (
  <div className="form-group fellow-details-body col-md-4">
    <div className="pip-activation-form-label">Period</div>
    <select
      className="custom-select pip-duration-select"
      id="pipPeriod"
      name="pipPeriod"
      onChange={handlePipPeriod}
    >
      <option value="2">2 Weeks</option>
      <option value="4">4 Weeks</option>
      <option value="6">6 Weeks</option>
    </select>
  </div>
);

export const PipCalendar = (startDate, handleDateChange, handlePipPeriod) => (
  <div className="row">
    <div className="form-group fellow-details-body col-md-4">
      <div className="pip-activation-form-label" id="datePicker">
        Start Date
      </div>
      <div className="input-group fellow-details-input mb-2 ">
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy"
        />
        <CalendarInput />
      </div>
    </div>
    {PipPeriod(handlePipPeriod)}
  </div>
);

const PipActivation = props => {
  const {
    // all the required props
    fellowName,
    department,
    ratings,
    handleChange,
    handlePipPeriod,
    mgtSupportFieldCount,
    handleMgtInputChange,
    addManagementSupport,
    handleDateChange,
    startDate,
    handleSubmit,
    message
  } = props;
  return (
    <div className="container">
      <div className="pip-activation-form-title mt-5">
        PIP ACTIVATION {`- ${fellowName}`}
      </div>
      <div className="row">
        <div className="col-12">
          <form onSubmit={handleSubmit} className="pip-activation-form-bkg">
            {FormHeaders(fellowName, department)}
            <div>
              <MapAreasOfConcernData
                averageRatings={ratings}
                handleChange={handleChange}
                {...props}
              />
            </div>
            {SuportFields(
              mgtSupportFieldCount,
              handleMgtInputChange,
              addManagementSupport
            )}
            {PipCalendar(startDate, handleDateChange, handlePipPeriod)}
            {message ? (
              <span className="alert alert-success">{message}</span>
            ) : (
              ''
            )}
            <br />
            <div id="">
              <button
                id="submitFormButton"
                type="submit"
                className="btn btn-primary btn-submit-pip-form"
                onSubmit={handleSubmit}
              >
                SUBMIT{' '}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

PipActivation.propTypes = {
  fellowName: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  ratings: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
  mgtSupportFieldCount: PropTypes.number.isRequired,
  handleMgtInputChange: PropTypes.func.isRequired,
  addManagementSupport: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default PipActivation;
