import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MapAreasOfConcernData from './MapAreasOfConcernData';
import MapManagementSupportFields from './MapManagementSupportFields';
import { renderInputLabels } from './AreaOfConcernInput';
import './PipActivationForm.css';

class PipActivationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      department: 'TDD',
      startDate: new Date(),
      pipPeriod: 2,
      managementSupport: {},
      mgtSupportFieldCount: 1
    };
  }

  handleChange = (event, attribute = null) => {
    const { name, value } = event.target;
    const {
      communication,
      integration,
      quality,
      quantity,
      initiative,
      professionalism
    } = this.state;

    switch (attribute) {
      case 'Communication':
        this.setState({
          communication: { ...communication, [name]: value }
        });
        break;
      case 'Integration':
        this.setState({
          integration: { ...integration, [name]: value }
        });
        break;
      case 'Quality':
        this.setState({
          quality: { ...quality, [name]: value }
        });
        break;
      case 'Quantity':
        this.setState({
          quantity: { ...quantity, [name]: value }
        });
        break;
      case 'Initiative':
        this.setState({
          initiative: { ...initiative, [name]: value }
        });
        break;
      case 'Professionalism':
        this.setState({
          professionalism: { ...professionalism, [name]: value }
        });
        break;
      default:
        this.setState({ [name]: value });
        break;
    }
  };

  handleDateChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleMgtInputChange = event => {
    const { name, value } = event.target;
    const { managementSupport } = this.state;
    this.setState({
      managementSupport: { ...managementSupport, [name]: value }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  addManagementSupport = event => {
    event.preventDefault();
    this.setState(state => ({
      mgtSupportFieldCount: state.mgtSupportFieldCount + 1
    }));
  };

  extractFellowName = fellow => {
    const fellowName = this.getFellowName(fellow);
    const result = fellowName.split(' ');
    return result[0] === 'undefined' ? '' : fellowName.toUpperCase();
  };

  getFellowName = fellow =>
    fellow.user
      ? `${fellow.user.firstName} ${fellow.user.lastName}`
      : `${fellow.firstName} ${fellow.lastName}`;

  renderInputLabels = title => (
    <div className="pip-activation-form-label">{title}</div>
  );

  captureFellowDetails = fieldId => (
    <input
      className="form-control fellow-details-input"
      type="text"
      name={fieldId}
      id={fieldId}
      value={fieldId}
    />
  );

  render = () => {
    const {
      department,
      startDate,
      pipPeriod,
      mgtSupportFieldCount
    } = this.state;
    const { averageRatings, fellow } = this.props;
    const fellowName = this.extractFellowName(fellow);
    return (
      <div className="container">
        <div className="pip-activation-form-title mt-5">
          PIP ACTIVATION {`- ${fellowName}`}
        </div>
        <div className="row">
          <div className="col-12">
            <form className="pip-activation-form-bkg">
              <div className="row">
                <div className="form-group fellow-details-body col-md-4">
                  {renderInputLabels('Fellow Name')}
                  {this.captureFellowDetails(fellowName)}
                </div>
                <div className="form-group fellow-details-body col-md-4">
                  {renderInputLabels('Department')}
                  {this.captureFellowDetails(department)}
                </div>
              </div>
              <div>
                <MapAreasOfConcernData
                  averageRatings={averageRatings}
                  handleChange={this.handleChange}
                />
              </div>
              <div className="row" id="addSupport">
                <div className="form-group mgt-support-body col-12">
                  <div className="pip-activation-form-label">
                    Management Support
                  </div>
                  <MapManagementSupportFields
                    mgtSupportFieldCount={mgtSupportFieldCount}
                    handleMgtInputChange={this.handleMgtInputChange}
                  />
                  <button
                    type="submit"
                    className="btn btn-add-support"
                    id="addSupportButton"
                    name="addSupport"
                    onClick={this.addManagementSupport}
                  >
                    Add Support
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="form-group fellow-details-body col-md-4">
                  <div className="pip-activation-form-label" id="datePicker">
                    Start Date
                  </div>
                  <div className="input-group fellow-details-input mb-2 ">
                    <DatePicker
                      selected={startDate}
                      onChange={this.handleDateChange}
                      dateFormat="MM/dd/yyyy"
                    />
                    <div className="input-group-apend text-right">
                      <div className="input-group-text">
                        <i className="fas fa-calendar-alt" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group fellow-details-body col-md-4">
                  <div className="pip-activation-form-label">Period</div>
                  <select
                    className="custom-select pip-duration-select"
                    id="pipPeriod"
                    name="pipPeriod"
                    value={pipPeriod}
                    onChange={this.handleChange}
                  >
                    <option value="2">2 Weeks</option>
                    <option value="4">4 Weeks</option>
                    <option value="6">6 Weeks</option>
                  </select>
                </div>
              </div>
              <div id="">
                <button
                  id="submitFormButton"
                  type="submit"
                  className="btn btn-primary btn-submit-pip-form"
                  onClick={this.handleSubmit}
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
}

PipActivationForm.propTypes = {
  fellow: PropTypes.shape([]).isRequired,
  averageRatings: PropTypes.shape({}).isRequired
};
export default PipActivationForm;
