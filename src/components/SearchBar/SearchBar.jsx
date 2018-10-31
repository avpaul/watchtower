import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import './SearchBar.css';

class SearchBar extends Component {
  componentDidUpdate(prevProps) {
    const {
      getFellows, perPage, filter, search,
    } = this.props;
    if (prevProps.search !== search) {
      getFellows({ perPage, filter, search });
    }
  }

  render() {
    const { search, handleSearchChange } = this.props;
    return (

      <div id="table_search_form" className="inner-addon">

        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          type="search"
          className="form-control fellow-search"
          name="fellow_search"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search the Table"
        />

      </div>
    );
  }
}

SearchBar.propTypes = {
  getFellows: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  perPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  filter: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
};

export default SearchBar;
