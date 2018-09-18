import React, { Component } from 'react';
import { Input, Dropdown, Icon, Menu, Button } from 'antd';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

import './Search.css';

@inject('searchModel', 'appUI')
@observer
class Search extends Component {
    componentDidMount() {
      this.fetchData();
    }

    componentDidUpdate(prevProps) {
      // if (this.props.searchModel.term !== prevProps.term || this.props.searchModel.filterName !== prevProps.filterName) {
      //   this.fetchData(this.props.searchModel.term, this.props.searchModel.filterName);
      // }
    }

    get dropdownMenu() {
        return (
            <Menu
                className='dropdown-menu'
                value={this.props.searchModel.filterName}
                onClick={this.onFilterClick}
                selectedKeys={[this.props.searchModel.filterName]}
            >
            <Menu.Item key="artist" value='artist'>
                Artist
            </Menu.Item>
            <Menu.Item key="album" value='album'>
                Album
            </Menu.Item>
            <Menu.Item key="track" value='track'>
                Track
            </Menu.Item>
        </Menu>
        );
    };

    get addonSearchIcon() {
        return (
            <Icon type="search" />
        );
    };

    fetchData = (term, filterName) => {
      if (term && filterName) {
        this.props.searchModel.find(this.props.match(term, filterName));
      }
    }

    getFilterName = (filterName) => {
      return filterName.charAt(0).toUpperCase() + filterName.slice(1);
    }

    onInputChange = e => {
      this.props.searchModel.inputChange(e.target.value);
      this.props.appUI.enableButton(e.target.value);
    }

    onFilterClick = e => {
      this.props.searchModel.filterChange(e.item.props.value);
    }

    onSubmitClick = e => {
      e.preventDefault();
      const { term, filterName } = this.props.searchModel;
      if (term !== '') {
        this.props.searchModel.find(term, filterName);
        this.props.searchModel.setTermText(term);
        this.clearInput();
        this.props.history.push(`/search/${filterName}`);
      }
    }

    clearInput = () => {
      this.props.searchModel.term = '';
    }

    render() {
      return (
        <form className='searcher-wrapper' onSubmit={this.onSubmitClick}>
          <Input
            placeholder="Find some music..."
            className="searcher-input"
            onChange={this.onInputChange}
            value={this.props.searchModel.term}
            addonAfter={this.addonSearchIcon}
          />
          <Dropdown
            className='dropdown'
            overlay={this.dropdownMenu}
          >
            <Button className="ant-dropdown-link">
              {this.getFilterName(this.props.searchModel.filterName)}
              <Icon type="down" />
            </Button>
          </Dropdown>
          <Button
            type="primary"
            disabled={this.props.appUI.isButtonDisabled}
            onClick={this.onSubmitClick}
          >
            Submit
          </Button>
        </form>
      );
    }
}

Search.propTypes = {
  searchModel: PropTypes.object,
  appUI: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object
};

export default Search;
