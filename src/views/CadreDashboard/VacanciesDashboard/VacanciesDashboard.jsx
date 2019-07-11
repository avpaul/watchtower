import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Title from '../../../components/Title';
import { CadreMainButton } from '../../../components/Buttons';
import AddVacanciesModal from './AddVacanciesModal';
import { underDevelopment } from '../../../utils';
import ViewVacancies from './ViewVacancies/ViewVacancies';
import PMloader from '../../../components/CustomLoader/PMLoader';

import './vacancyDashboard.scss';

class VacanciesDashboard extends Component {
  state = {
    vacanciesToDisplay: "project"
  }

  componentDidMount() {
    const { getAllVacanciesAction } = this.props;
    getAllVacanciesAction();
  }

  toogleVacanciesToDisplay = (e) => {
    this.setState({
      vacanciesToDisplay: e.target.value
    })
  }

  renderToggleButtons = () => {
    const { vacanciesToDisplay } = this.state;
    return (
      <div className="toogle-container">
        <button
          type="button"
          value="project"
          className={
            vacanciesToDisplay === "project"
              ? "vacancy-toggle-button--active"
              : "vacancy-toggle-button"
          }
          onClick={this.toogleVacanciesToDisplay}
        >
          Project Vacancies
        </button>
        <button
          type="button"
          value="certification"
          className={
            vacanciesToDisplay === "certification"
              ? "vacancy-toggle-button--active"
              : "vacancy-toggle-button"
          }
          onClick={this.toogleVacanciesToDisplay}
        >
          Certification Vacancies
        </button>
      </div>
    )
  }

  renderTopBar = (data) => {
    let totalCount = 0;
    let projectVacanciesCount = 0;
    let certificationVacanciesCount = 0;
    if (data.length !== 0) {
      projectVacanciesCount = data.projectVacancies.length
      certificationVacanciesCount = data.certificationVacancies.length;
      totalCount = projectVacanciesCount + certificationVacanciesCount;
    }
    return (
      <React.Fragment>
        <div className="col-9">
          <Title title={`${totalCount} Vacancies (${projectVacanciesCount} Project, ${certificationVacanciesCount} Certification)`} />
        </div>
        <div className="col-3">
          <CadreMainButton
            buttonProps={{
              'data-toggle': 'modal',
              'data-target': '#addProjectVacanciesModal'
            }}
            label="ADD VACANCIES"
          />
        </div>
      </React.Fragment>
    )
  };

  renderBody = () => {
    const {
      getAllVacancies: { data, loading }
    } = this.props;
    const { vacanciesToDisplay } = this.state;
    return (
      <React.Fragment>
        <AddVacanciesModal />
        {loading ? (
          <PMloader />
        ) : (
            <React.Fragment>
              <div className="row">{this.renderTopBar(!data ? [] : data)}</div>
              <div>{this.renderToggleButtons()}</div>
              <ViewVacancies vacancies={
                vacanciesToDisplay === "project" ? data.projectVacancies : data.certificationVacancies
              }
                vacanciesToDisplay={vacanciesToDisplay} />
            </React.Fragment>
          )}
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="vacancies-dashboard cadre__page">
        {underDevelopment(this.renderBody())}
      </div>
    );
  }
}

VacanciesDashboard.propTypes = {
  getAllVacanciesAction: PropTypes.func.isRequired,
  getAllVacancies: PropTypes.shape({}).isRequired
};

export default VacanciesDashboard;
