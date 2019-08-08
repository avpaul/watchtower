/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { filter } from 'fuzzaldrin';
import './index.scss';
import { truncate } from '../../utils';

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
    const { items } = this.props;
    const query = e.target.value;
    const data = filter(items, query);
    this.setState({
      searchItem: query,
      items: data
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

  renderItems = ({ open, search, items, searchItem, width }) => (
    <Fragment>
      {open && (
        <div className="filter-dropdown__list">
          {search && (
            <input
              type="text"
              placeholder="Search.."
              value={searchItem}
              id="search_input"
              onChange={this.search}
              className="filter-dropdown__search"
            />
          )}
          <ul className="filter-dropdown__list__items" style={{ width }}>
            {items &&
              items.map(item => (
                <li
                  key={item}
                  className="filter-dropdown__list__item"
                  onClick={this.handleSelect}
                  onKeyPress={this.handleSelect}
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
    const {
      search,
      title,
      width,
      fontSize,
      characterLength,
      chevronColor,
      dropdownBackgroundColor
    } = this.props;
    const { items } = this.state;

    return (
      <Fragment>
        <div ref={this.setWrapperRef} className="filter-dropdown">
          {title && <p className="filter-dropdown__title">{title}</p>}
          <button
            type="button"
            className="filter-dropdown__button"
            onClick={() => this.setState({ open: !open })}
            style={{ width: '100%', fontSize }}
          >
            <span>{current && truncate(current, characterLength)}</span>
            <span style={{ background: dropdownBackgroundColor }}>
              <i
                className="fas fa-chevron-down"
                style={{ color: chevronColor }}
              />
            </span>
          </button>
          {this.renderItems({ open, search, items, searchItem, width })}
        </div>
      </Fragment>
    );
  }
}

Filter.defaultProps = {
  width: '',
  fontSize: '',
  characterLength: 9,
  chevronColor: '',
  dropdownBackgroundColor: '',
  items: [],
  title: undefined,
  type: undefined,
  search: false
};

Filter.propTypes = {
  search: PropTypes.bool,
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  width: PropTypes.string,
  fontSize: PropTypes.string,
  type: PropTypes.string,
  getFilter: PropTypes.func.isRequired,
  characterLength: PropTypes.number,
  chevronColor: PropTypes.string,
  dropdownBackgroundColor: PropTypes.string
};

export default Filter;
