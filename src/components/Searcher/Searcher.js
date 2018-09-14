import React, { Component } from 'react';
import { Input, Dropdown, Icon, Menu, Button } from 'antd';
import { observer } from 'mobx-react';

import './Searcher.css';
import { SearcherModel } from '../../models/SearcherModel/SearcherModel';

@observer
export default class Searcher extends Component {
  constructor() {
    super();

    this.model = new SearcherModel();
  }

    get dropdownMenu() {
        return (
            <Menu
                className='dropdown-menu'
                value={this.model.filterName}
                onClick={this.onFilterClick}
                selectedKeys={[this.model.filterName]}
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

    onInputChange = e => {
      this.model.term = e.target.value;
    }

    onFilterClick = e => {
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
