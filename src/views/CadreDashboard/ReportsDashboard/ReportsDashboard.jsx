import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fuzzy from 'fuzzy';
import Reports from '../../../components/Reports';
import PaginationFrontendWrapper from '../../../components/Pagination/PaginationWrapper';

export class ReportsDashboard extends Component {
  /**
   * Creates the ShoppingCart Component and initializes state
   * @constructor
   * @param {*} props - Super props inherited by Component
   */
  constructor(props) {
    super(props);
    this.state = {
      searchWord: '',
      searching: false
    };
  }

  /**
   * Ensures that the component that updates the cart in mounted
   * Lifecycle implementation
   */
  componentDidMount() {
    const { fetchEngineersReportActions, fetchAllRoles } = this.props;
    fetchEngineersReportActions({ pageSize: 'all' });
    fetchAllRoles();
  }

  componentDidUpdate(prevProps) {
    const { engineers, paginationWrapper } = this.props;
    if (engineers !== prevProps.engineers) {
      paginationWrapper.updateData(engineers.data.data);
    }
  }

  /**
   * handle search value input
   * @param  {event} e
   * @return {void}
   */
  handleSearchChange = e => {
    const { value } = e.target;
    if (value) {
      this.setState({
        searchWord: value.replace(/\s/g, ''),
        searching: true
      });
    } else {
      this.setState({ searching: false });
    }
  };

  /**
   * Performs fuzzy search through an array
   * making use of fuzzy javascript library
   * @return {array} search results
   */
  fuzzySearch = engineers => {
    const { searchWord } = this.state;
    const options = {
      pre: '<b>',
      post: '</b>',
      extract: el => `${el.first_name}${el.last_name}`
    };
    const results = fuzzy.filter(searchWord, engineers, options);
    const searchResults = results.map(item => item.original);
    return searchResults;
  };

  render() {
    const {
      cadreroles,
      loading,
      paginationWrapper: {
        state: { paginatedData }
      },
      paginationWrapper,
      engineers
    } = this.props;
    const { searching } = this.state;

    return (
      <React.Fragment>
        <Reports
          engineers={
            searching ? this.fuzzySearch(engineers.data.data) : paginatedData
          }
          paginationWrapper={paginationWrapper}
          cadreroles={cadreroles}
          searching={searching}
          handleSearchChange={this.handleSearchChange}
          loading={loading}
        />
      </React.Fragment>
    );
  }
}

ReportsDashboard.propTypes = {
  fetchEngineersReportActions: PropTypes.func.isRequired,
  fetchAllRoles: PropTypes.func.isRequired,
  engineers: PropTypes.func.isRequired,
  paginationWrapper: PropTypes.func.isRequired,
  cadreroles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  loading: PropTypes.bool.isRequired
};

const PaginationWrapped = props => (
  <PaginationFrontendWrapper component={<ReportsDashboard {...props} />} />
);

export default PaginationWrapped;
