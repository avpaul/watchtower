import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fuzzy from 'fuzzy';
import arrayKey from 'weak-key';
import TDDOPsVacancyCard from '../../../../components/TDDOpsVacancyCard';
import './ViewVacancies.scss';

import PaginationFrontendWrapper from '../../../../components/Pagination/PaginationWrapper';
import EmptyDashboard from '../../../../components/WorkInProgress/WorkInProgress';

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

  fuzzySearchVacancies = (isProjectVacancy = true, searchWord) => {
    const { vacancies } = this.props;
    let vacanciesArray = isProjectVacancy ? vacancies.projectVacancies : [];
    if (!isProjectVacancy) {
      vacanciesArray = vacancies.certificationVacancies || [];
    }

    const options = {
      pre: '<b>',
      post: '</b>',
      extract: el =>
        `${isProjectVacancy ? el.project.name : el.certification.name}${
          isProjectVacancy ? el.role.name : ''
        }`
    };

    const results = fuzzy.filter(searchWord, vacanciesArray, options);
    const searchResults = results.map(item => item.original);

    return searchResults;
  };

  handleSearchTextChange = e => {
    const { vacanciesToDisplay } = this.state;
    const { vacancies, paginationWrapper } = this.props;

    const { value } = e.target;

    const searchWord = value.replace(/\s/g, '');

    const vacancyArray =
      vacanciesToDisplay === 'project'
        ? vacancies.projectVacancies
        : vacancies.certificationVacancies;

    const filteredArray =
      vacanciesToDisplay === 'project'
        ? this.fuzzySearchVacancies(true, searchWord) || []
        : this.fuzzySearchVacancies(false, searchWord) || [];

    paginationWrapper.updateData(
      e.target.value === '' ? vacancyArray : filteredArray,
      { page: 1 }
    );
  };

  updatePaginateData = toDisplay => {
    const { vacancies, paginationWrapper } = this.props;
    const vacanciesArray =
      toDisplay === 'project'
        ? vacancies.projectVacancies
        : vacancies.certificationVacancies;
    paginationWrapper.updateData(vacanciesArray, { page: 1 });
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
        <span className="vacancy-search-icon">
          <i className="fas fa-search" />
        </span>
      </div>
    );
  };

  renderVacancies = (vacancies, vacanciesToDisplay) => {
    const mappedVacancies =
      vacancies.length !== 0 ? (
        <div className="ops-vacancies__container">
          {vacancies.map(vacancy => (
            <TDDOPsVacancyCard
              key={arrayKey(vacancy)}
              vacancy={vacancy}
              vacanciesToDisplay={vacanciesToDisplay}
            />
          ))}
        </div>
      ) : (
        <div className="ops-no-vacancies">
          <EmptyDashboard title="Welcome, please create the first Vacancy!" />
        </div>
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
        {this.renderVacancies(
          paginationWrapper.state.paginatedData,
          vacanciesToDisplay
        )}
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
