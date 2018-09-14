import React, { Component } from 'react';
import { Input, Dropdown, Icon, Menu, Button } from 'antd';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

import './Searcher.css';
import { SearcherModel } from '../../models/SearcherModel/SearcherModel';

@observer
export default class Searcher extends Component {
  constructor() {
    super();

    this.ui = new SearcherUI();
    this.model = new SearcherModel();
  }

  get dropdownMenu() {
    return (
      <Menu
        className='dropdown-menu'
        value={this.model.filterName}
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
      this.model.term = e.target.value;
    }

    onFilterClick = e => {
      console.log(e.item.props.value);
      this.model.filterName = e.item.props.value;
    }

    onSubmitClick = e => {
      e.preventDefault();
      const { term, filterName } = this.model;
      if (term !== '') {
        this.model.find(term, filterName);
        this.clearInput();
      }
    }

    clearInput = () => {
      this.model.term = '';
    }

    render() {
      return (
        <form className='searcher-wrapper' onSubmit={this.onSubmitClick}>
          <Input
            placeholder="Find some music..."
            className="searcher-input"
            onChange={this.onInputChange}
            value={this.model.term}
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
            disabled={!this.model.term}
            onClick={this.onSubmitClick}
          >
                Submit
          </Button>
        </form>
      );
    }
}

class SearcherUI {
    @observable
    value = '';

    @observable
    filterName = '1st filter';

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
