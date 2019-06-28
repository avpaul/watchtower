import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fuzzy from 'fuzzy';
import Reports from '../../../components/Reports';
import PMloader from '../../../components/CustomLoader/PMLoader';

class ReportsDashboard extends Component {
  /**
   * Creates the ShoppingCart Component and initializes state
   * @constructor
   * @param {*} props - Super props inherited by Component
   */
  constructor(props) {
    super(props);
    this.state = {
      engineers: [],
      searchWord: '',
      total: '',
      pageTotal: 1
    };
  }

  /**
   * Ensures that the component that updates the cart in mounted
   * Lifecycle implementation
   */
  componentDidMount() {
    const { fetchEngineersReportActions, metaData, fetchAllRoles } = this.props;

    fetchEngineersReportActions().then(res => {
      if (!res.error) {
        this.setState(
          {
            engineers: res.data.data.data,
            total: res.data.data.total,
            pageTotal: Math.ceil(res.data.data.total / metaData.perPage)
          },
          () => fetchAllRoles()
        );
      }
    });
  }

  /**
   * handle search value input
   * @param  {event} e
   * @return {void}
   */
  handleSearchChange = e => {
    const { value } = e.target;
    this.setState({ searchWord: value.replace(/\s/g, '') });
  };

  /**
   * Performs fuzzy search through an array
   * making use of fuzzy javascript library
   * @return {array} search results
   */
  fuzzySearch = () => {
    const { searchWord, engineers } = this.state;
    const options = {
      pre: '<b>',
      post: '</b>',
      extract: el => `${el.first_name}${el.last_name}${el.cohort}${el.email}`
    };
    const results = fuzzy.filter(searchWord, engineers, options);
    const searchResults = results.map(item => item.original);
    return searchResults;
  };

  /**
   * handles changes that happen on size of the page or the page limit
   * and updates the relevant items the should be displayed
   * @param  {*}
   * @return {array}
   */
  handleShowSizeChange = (_, perPage) => {
    const { fetchEngineersReportActions, $perPage } = this.props;
    const { total } = this.state;
    $perPage(perPage);
    fetchEngineersReportActions().then(res => {
      this.setState(
        {
          engineers: res.data.data.data,
          pageTotal: Math.ceil(total / perPage)
        },
        () => window.scrollTo(0, 0)
      );
    });
  };

  /**
   * handles changes that happen on number of the page
   * and updates the relevant items the should be displayed
   * @param  {number} pageNumber
   * @return {array}
   */
  handlePageChange = pageNumber => {
    const { fetchEngineersReportActions, $page } = this.props;
    const { pageTotal } = this.state;
    $page(pageNumber, pageTotal);
    fetchEngineersReportActions().then(res => {
      this.setState(
        {
          engineers: res.data.data.data
        },
        () => window.scrollTo(0, 0)
      );
    });
  };

  isLessThanTotal = element => {
    const { total } = this.state;
    return element <= total + 10;
  };

  render() {
    const { total } = this.state;
    const { metaData, cadreroles, loading } = this.props;
    const options = metaData.perPageOptions.filter(this.isLessThanTotal);

    return (
      <React.Fragment>
        {loading ? (
          <PMloader />
        ) : (
          <Reports
            engineers={this.fuzzySearch()}
            handleSearchChange={this.handleSearchChange}
            handleShowSizeChange={this.handleShowSizeChange}
            handlePageChange={this.handlePageChange}
            pageSizeOptions={options}
            total={Number.parseInt(total, 10)}
            cadreroles={cadreroles}
          />
        )}
      </React.Fragment>
    );
  }
}

ReportsDashboard.propTypes = {
  fetchEngineersReportActions: PropTypes.func.isRequired,
  fetchAllRoles: PropTypes.func.isRequired,
  $page: PropTypes.func.isRequired,
  $perPage: PropTypes.func.isRequired,
  metaData: PropTypes.shape().isRequired,
  cadreroles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  loading: PropTypes.bool.isRequired
};

export default ReportsDashboard;
