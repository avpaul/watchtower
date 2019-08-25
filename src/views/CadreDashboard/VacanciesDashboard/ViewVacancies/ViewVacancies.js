import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
      vacancies: { projectVacancies },
      vacanciesWithNoCycleId
    } = this.props;

    const merged = this.mergeVacancies(
      projectVacancies,
      vacanciesWithNoCycleId
    );

    this.updateInitialState(merged || []);
  }

  updateInitialState = vacancies => {
    const { paginationWrapper, location } = this.props;
    paginationWrapper.updateData(vacancies, { perPage: 20 });

    const searchExist = location.search;
    if (searchExist) {
      const param = searchExist.split('?')[1].trim();
      if (param === 'certification') {
        this.toggleVacanciesToDisplay({
          target:{
            value: param,
          }
        });
      }
    }
  };

  mergeVacancies = (source, target) => {
    if (source) return source.concat(target);
    return [];
  };

  fuzzySearchVacancies = (isProjectVacancy = true, searchWord) => {
    const { vacancies, vacanciesWithNoCycleId } = this.props;
    let vacanciesArray = isProjectVacancy
      ? this.mergeVacancies(vacancies.projectVacancies, vacanciesWithNoCycleId)
      : [];
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
    const { vacancies, paginationWrapper, vacanciesWithNoCycleId } = this.props;

    const { value } = e.target;

    const searchWord = value.replace(/\s/g, '');

    const vacancyArray =
      vacanciesToDisplay === 'project'
        ? this.mergeVacancies(
            vacancies.projectVacancies,
            vacanciesWithNoCycleId
          )
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
    const { vacancies, paginationWrapper, vacanciesWithNoCycleId } = this.props;
    const vacanciesArray =
      toDisplay === 'project'
        ? this.mergeVacancies(
            vacancies.projectVacancies,
            vacanciesWithNoCycleId
          )
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

const PaginatedVacanciesDashboard = props => {
  const ViewRoleVacanciesComponent = withRouter(ViewRoleVacancies);
  return(
    <PaginationFrontendWrapper component={<ViewRoleVacanciesComponent {...props} />} />
  );
};

ViewRoleVacancies.propTypes = {
  vacancies: PropTypes.instanceOf(Object),
  paginationWrapper: PropTypes.shape({}).isRequired,
  vacanciesWithNoCycleId: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.shape({}).isRequired,
};

ViewRoleVacancies.defaultProps = {
  vacancies: []
};

export default PaginatedVacanciesDashboard;
