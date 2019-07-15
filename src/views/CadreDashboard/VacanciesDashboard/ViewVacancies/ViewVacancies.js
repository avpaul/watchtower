import React, { Component } from 'react';
import PropTypes from 'prop-types';
import arrayKey from 'weak-key';
import TDDOPsVacancyCard from '../../../../components/TDDOpsVacancyCard';
import './ViewVacancies.scss';

import PaginationFrontendWrapper from '../../../../components/Pagination/PaginationWrapper';

export class ViewRoleVacancies extends Component {
  state = {
    vacanciesToDisplay: 'project'
  };

  componentDidMount() {
    const {
      vacancies: { projectVacancies }
    } = this.props;
    this.updateInitialState(projectVacancies || []);
  }

  updateInitialState = vacancies => {
    const { paginationWrapper } = this.props;
    paginationWrapper.updateData(vacancies, { perPage: 20 });
  };

  updatePaginateData = toDisplay => {
    const { vacancies, paginationWrapper } = this.props;
    const vacanciesArray =
      toDisplay === 'project'
        ? vacancies.projectVacancies
        : vacancies.certificationVacancies;
    paginationWrapper.updateData(vacanciesArray || []);
  };

  toggleVacanciesToDisplay = e => {
    this.updatePaginateData(e.target.value);
    this.setState({
      vacanciesToDisplay: e.target.value
    });
  };

  renderToggleButtons = () => {
    const { vacanciesToDisplay } = this.state;
    return (
      <div className="toogle-container">
        <button
          id="project-button"
          type="button"
          value="project"
          className={
            vacanciesToDisplay === 'project'
              ? 'vacancy-toggle-button--active'
              : 'vacancy-toggle-button'
          }
          onClick={this.toggleVacanciesToDisplay}
        >
          Project Vacancies
        </button>
        <button
          id="certification-button"
          type="button"
          value="certification"
          className={
            vacanciesToDisplay === 'certification'
              ? 'vacancy-toggle-button--active'
              : 'vacancy-toggle-button'
          }
          onClick={this.toggleVacanciesToDisplay}
        >
          Certification Vacancies
        </button>
      </div>
    );
  };

  renderVacancies = (vacancies, vacanciesToDisplay) => {
    const mappedVacancies =
      vacancies.length !== 0 ? (
        vacancies.map(vacancy => (
          <TDDOPsVacancyCard
            key={arrayKey(vacancy)}
            vacancy={vacancy}
            vacanciesToDisplay={vacanciesToDisplay}
          />
        ))
      ) : (
        <div className="ops-no-vacancies">No Vacancies</div>
      );
    return mappedVacancies;
  };

  render() {
    const { paginationWrapper } = this.props;
    const { vacanciesToDisplay } = this.state;
    return (
      <div>
        <div>{this.renderToggleButtons()}</div>
        <div className="ops-vacancies-container">
          {this.renderVacancies(
            paginationWrapper.state.paginatedData,
            vacanciesToDisplay
          )}
        </div>
        <div className="">{paginationWrapper.renderPagination()}</div>
      </div>
    );
  }
}

const PaginatedVacanciesDashboard = props => (
  <PaginationFrontendWrapper component={<ViewRoleVacancies {...props} />} />
);

ViewRoleVacancies.propTypes = {
  vacancies: PropTypes.instanceOf(Object),
  paginationWrapper: PropTypes.shape({}).isRequired
};

ViewRoleVacancies.defaultProps = {
  vacancies: []
};

export default PaginatedVacanciesDashboard;
