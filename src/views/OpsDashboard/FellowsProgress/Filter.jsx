/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import './index.css';
import truncate from '../../../utils';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      current: 'All',
      items: [],
      searchItem: ''
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  static getDerivedStateFromProps(props, state) {
    if (state.searchItem !== '') {
      return { current: props.current, items: state.items };
    }
    return { current: props.current, items: props.items };
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  search = e => {
    const { items } = this.state;
    const query = e.target.value;
    const options = {
      keys: []
    };
    const fuse = new Fuse(items, options);
    const fuseArray = fuse.search(query);
    const results = fuseArray.map(item => items[item]);
    this.setState({
      searchItem: query,
      items: results
    });
  };

  handleSelect = e => {
    const { getFilter, type } = this.props;
    const value = e.target.innerHTML;
    this.setState({ current: e.target.innerHTML, open: false });
    getFilter(type, value);
  };

  /**
   * Check if clicked on outside of element
   */
  handleClickOutside(event) {
    const { open } = this.state;
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (open === false) {
        return;
      }
      this.setState({ open: !open });
    }
  }

  renderItems = (open, search, items, searchItem) => (
    <Fragment>
      {open && (
        <div className="open">
          {search && (
            <input
              type="text"
              placeholder="Search.."
              value={searchItem}
              id="search_input"
              onChange={this.search}
              className="filter_search"
            />
          )}
          <ul className="open__list_items">
            {items &&
              items.map(item => (
                <li
                  key={item}
                  className="open__list_item"
                  onClick={this.handleSelect}
                  role="button"
                >
                  {item}
                </li>
              ))}
          </ul>
        </div>
      )}
    </Fragment>
  );

  render() {
    const { open, current, searchItem } = this.state;
    const { search, title } = this.props;

    let { items } = this.state;
    if (search) {
      items = items.slice(0, 4);
    }

    return (
      <Fragment>
        <div ref={this.setWrapperRef} className="">
          {title}
          <button
            type="button"
            className="filter_dropdown"
            onClick={() => this.setState({ open: !open })}
          >
            <span>{current && truncate(current, 9)} </span>
            <span>
              <i className="fas fa-chevron-down" />
            </span>
          </button>

          {this.renderItems(open, search, items, searchItem)}
        </div>
      </Fragment>
    );
  }
}

Filter.propTypes = {
  search: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  getFilter: PropTypes.func.isRequired
};

export default Filter;
