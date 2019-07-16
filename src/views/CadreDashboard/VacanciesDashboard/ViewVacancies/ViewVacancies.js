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

  filterProjectArray = (vacancyArray, text) => {
    const filteredArrayByProject = vacancyArray.filter(vacancy => {
      const projectVacancyName = vacancy.project.name.toLowerCase();
      return projectVacancyName.indexOf(text.toLowerCase()) !== -1;
    });

    const filteredArrayByRole = vacancyArray.filter(vacancy => {
      const roleVacancyName = vacancy.role.name.toLowerCase();
      return roleVacancyName.indexOf(text.toLowerCase()) !== -1;
    });
    const filteredArray = filteredArrayByProject.concat(filteredArrayByRole);
    return filteredArray;
  };

  filterCertificationVacancy = (vacancyArray, text) => {
    const filteredArray = vacancyArray.filter(vacancy => {
      const certificationVacancyName = vacancy.certification.name.toLowerCase();
      return certificationVacancyName.indexOf(text.toLowerCase()) !== -1;
    });
    return filteredArray;
  };

  handleSearchTextChange = e => {
    const { vacanciesToDisplay } = this.state;
    const { vacancies } = this.props;
    const vacancyArray =
      vacanciesToDisplay === 'project'
        ? vacancies.projectVacancies
        : vacancies.certificationVacancies;

    const filteredArray =
      vacanciesToDisplay === 'project'
        ? this.filterProjectArray(vacancyArray, e.target.value)
        : this.filterCertificationVacancy(vacancyArray, e.target.value);

    this.updateInitialState(filteredArray || []);
  };

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
    paginationWrapper.updateData(vacanciesArray || [], { page: 1 });
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

  renderSearchDiv = () => {
    const { vacanciesToDisplay } = this.state;
    const searchPlaceholder =
      vacanciesToDisplay === 'project'
        ? `Search by Project/Role Name`
        : `Search by Cert... Name`;
    return (
      <div className="vacancy-search-div">
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="vacancy-search-input"
          onChange={this.handleSearchTextChange}
        />
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
      <div className="ops-vacancies__wrapper">
        <div className="ops-vacancies__filter">
          {this.renderToggleButtons()}
          {this.renderSearchDiv()}
        </div>
        <div className="ops-vacancies__container">
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
