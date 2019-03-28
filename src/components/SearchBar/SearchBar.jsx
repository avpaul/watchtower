import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import './SearchBar.css';

class SearchBar extends Component {
  componentDidUpdate(prevProps) {
    const { getFellows, perPage, filter, search } = this.props;
    if (prevProps.search !== search) {
      getFellows({ perPage, filter, search });
    }
  }

  handleClick = event => {
    const { search, handleSearchChange } = this.props;
    event.preventDefault();
    handleSearchChange({ target: { value: search } });
  };

  renderSearchButton = () => (
    <span className="input-group-append">
      <button
        id="search-button"
        className="btn border-0 table-search-append"
        onClick={this.handleClick}
        type="button"
      >
        <i className="fa fa-search text-white " />
      </button>
    </span>
  );

  renderSearchInput = () => {
    const { search, handleSearchChange } = this.props;

    return (
      <div id="table_search_form" className="table_search_div">
        <p>Search</p>
        <div className="input-group fellow-table-search">
          <DebounceInput
            minLength={2}
            debounceTimeout={300}
            type="search"
            className="form-control py-2 h-100 border-0"
            name="fellow_search"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search the Table"
          />
          {this.renderSearchButton()}
        </div>
      </div>
    );
  };

  render() {
    return <Fragment>{this.renderSearchInput()}</Fragment>;
  }
}

SearchBar.propTypes = {
  getFellows: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  perPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  filter: PropTypes.shape().isRequired,
  search: PropTypes.string.isRequired
};

export default SearchBar;
