import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import './PipActivationForm.css';
import PipActivation from '../../components/PipActivation';
import { redirectToExternalURL } from '../../utils';

class PipActivationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      department: 'TDD',
      startDate: new Date(),
      pipPeriod: 2,
      managementSupport: {},
      mgtSupportFieldCount: 1,
      communication: {
        attribute: 'communication',
        isUpdated: false,
        score: ''
      },
      integration: { attribute: 'integration', isUpdated: false, score: '' },
      quality: { attribute: 'quality', isUpdated: false, score: '' },
      quantity: { attribute: 'quantity', isUpdated: false, score: '' },
      initiative: { attribute: 'initiative', isUpdated: false, score: '' },
      score: '',
      professionalism: {
        attribute: 'professionalism',
        isUpdated: false,
        score: ''
      },
      message: ''
    };
  }

  handleChange = (event, attribute = '') => {
    const { name, value } = event.target;
    const { averageRatings } = this.props;
    let attributeName = attribute;
    attributeName = attributeName.toString().toLowerCase();
    const attributeValue = { ...this.state };
    const data = attributeValue[attributeName];
    data.score = averageRatings[attributeName];
    data[name] = value;
    data.isUpdated = true;
    this.setState({ [attributeName]: data });
  };

  handleDateChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleMgtInputChange = event => {
    const { name, value } = event.target;
    const { managementSupport } = this.state;
    const { fellow } = this.props;
    this.setState({
      managementSupport: { ...managementSupport, [name]: value },
      score: fellow.overall_average
    });
  };

  handlePipPeriod = event => {
    const { value } = event.target;
    this.setState({ pipPeriod: value });
  };

  mapFellowDetails = (fellow, currentFellow, startDate, areasOfConcern) => {
    const details = {
      Name: fellow.name,
      Email: fellow.email,
      ManagerEmail: fellow.managerEmail,
      Department: currentFellow.department,
      StartDate: startDate,
      Period: `${currentFellow.pipPeriod} Weeks`,
      Concern: areasOfConcern,
      Support: currentFellow.managementSupport
    };
    return details;
  };

  checkAttributes = (
    dataIncludesAttributes,
    startDate,
    areasOfConcern,
    fellow,
    backendServer,
    encodedDetails
  ) => {
    if (dataIncludesAttributes) {
      const { activatePip } = this.props;
      const { managementSupport, pipPeriod } = this.state;
      const data = {
        started_at: startDate,
        duration_in_weeks: pipPeriod,
        attributes: areasOfConcern,
        support: Object.values(managementSupport)
      };
      activatePip(fellow.fellow_id, data).then(res => {
        if (res.data) {
          this.setState({
            message: 'Pip Activated Successfully. Generating PDF, please wait!!'
          });
          setTimeout(
            () =>
              redirectToExternalURL(
                `${backendServer}/pipfeedback/${encodedDetails}`
              ),
            1000
          );
        }
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    const { fellow } = this.props;
    let { startDate } = this.state;
    const backendServer = process.env.REACT_APP_WATCHTOWER_SERVER;
    const currentFellow = this.state;
    const areasOfConcern = this.getAreasOfConcern(currentFellow);
    startDate = moment(startDate).format('YYYY-MM-DD');

    const fellowDetails = this.mapFellowDetails(
      fellow,
      currentFellow,
      startDate,
      areasOfConcern
    );
    const stringifiedFellow = JSON.stringify(fellowDetails);
    const encodedDetails = btoa(stringifiedFellow);

    let dataIncludesAttributes = false;
    const stateKeys = Object.keys(this.state);
    const attributeKeys = [
      'quality',
      'integration',
      'professionalism',
      'communication',
      'initiative',
      'quantity'
    ];
    attributeKeys.forEach(attribute => {
      if (stateKeys.includes(attribute)) {
        dataIncludesAttributes = true;
      }
    });
    this.checkAttributes(
      dataIncludesAttributes,
      startDate,
      areasOfConcern,
      fellow,
      backendServer,
      encodedDetails
    );
  };

  getAreasOfConcern = fellow => {
    const keysAllowed = [
      'quality',
      'integration',
      'professionalism',
      'communication',
      'initiative',
      'quantity'
    ];

    const attributes = keysAllowed.reduce(
      (attributeKey, value) => ({ ...attributeKey, [value]: fellow[value] }),
      {}
    );
    return this.formatAreasOfConcern(Object.values(attributes));
  };

  formatAreasOfConcern = attributes => {
    const userAttributes = attributes.filter(item => item.isUpdated);
    const formattedAttributes = userAttributes.map(element => {
      const data = {
        attribute: element.attribute,
        score: element.score,
        description: element.description,
        activity: element.activity,
        details: element.details
      };
      return data;
    });

    return formattedAttributes;
  };

  addManagementSupport = event => {
    event.preventDefault();
    this.setState(state => ({
      mgtSupportFieldCount: state.mgtSupportFieldCount + 1
    }));
  };

  render = () => {
    const { department, startDate, mgtSupportFieldCount, message } = this.state;
    const { averageRatings, fellow } = this.props;
    const { name } = fellow;
    return (
      <PipActivation
        message={message}
        fellowName={name}
        status={fellow.overall_status}
        ratings={averageRatings}
        handleChange={this.handleChange}
        handlePipPeriod={this.handlePipPeriod}
        mgtSupportFieldCount={mgtSupportFieldCount}
        handleMgtInputChange={this.handleMgtInputChange}
        addManagementSupport={this.addManagementSupport}
        handleDateChange={this.handleDateChange}
        startDate={startDate}
        handleSubmit={this.handleSubmit}
        department={department}
        {...this.state}
      />
    );
  };
}

PipActivationForm.propTypes = {
  fellow: PropTypes.shape([]).isRequired,
  averageRatings: PropTypes.shape({}).isRequired
};
export default PipActivationForm;
