import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu, Input, Dropdown, Button } from 'antd';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import { Redirect } from 'react-router-dom';// TODO Instead of that use path

import './Search.css';

@inject('searchModel')
@observer
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.ui = new SearchUI();
  }

   componentDidMount() {
     console.log('props', this.props);
   }

    get dropdownMenu() {
        return (
        <Menu
            className='dropdown-menu'
            value={this.props.searchModel.filterName}
            onClick={this.onFilterClick}
        >
        <Menu.Item key="0" value='artist'>
            Artist
        </Menu.Item>
        <Menu.Item key="1" value='album'>
                    Album
        </Menu.Item>
        <Menu.Item key="2" value='track'>
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

    onInputChange = e => {
      this.props.searchModel.term = e.target.value;
    }

    onFilterClick = e => {
      this.props.searchModel.filterName = e.item.props.value;
    }

    onSubmitClick = e => {
        e.preventDefault();
        const { term, filterName } = this.props.searchModel;
        if (term !== '') {
            this.props.searchModel.find(term, filterName);
            this.clearInput();
            this.props.history.push(this.direction);
        }
    }

    clearInput = () => {
        this.props.searchModel.term = '';
    }

    get direction() {
        return `/search/${this.props.searchModel.filterName}`;
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
              <a className="ant-dropdown-link" href="#">
                <Icon type="down" />
              </a>
            </Dropdown>
            <Button
              type="primary"
              disabled={!this.props.searchModel.term}
              onClick={this.onSubmitClick}
            >
                  Submit
            </Button>
            {this.ui.redirect && <Redirect to={this.direction}/>}
          </form>
      );
    }
}

class SearchUI {
    @observable
    value = '';

    @observable
    filterName = '1st filter';

    redirect = false;

    @action
    setValue = (value) => {
      this.value = value;
    }

    @action
    setFilterName = (value) => {
      console.log(value);
      this.filterName = value;
    }

    @action
    resetValue = () => {
      this.value = '';
    }
}

Search.propTypes = {
  searchModel: PropTypes.object,
  history: PropTypes.object
};
