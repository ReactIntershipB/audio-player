import React, { Component } from 'react';
import { Menu, Input, Radio } from 'antd';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

import './Search.css';

@inject('searchModel', 'appUI')
@observer
class SearchComponent extends Component {
    componentDidMount() {
      this.fetchData();
    }

    componentDidUpdate() {
      this.fetchData();
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

    fetchData = () => {
      const { term, type } = this.props.match.params;

      if (term && type) {
        this.props.searchModel.find(term, type);
      }
    }

    onInputChange = e => {
      this.props.searchModel.inputChange(e.target.value);
    }

    onFilterClick = value => {
      this.props.searchModel.filterChange(value.target.value);
    }

    onSubmitClick = value => {
      const { filterName } = this.props.searchModel;

      if (value !== '') {
        this.props.searchModel.find(value, filterName);
        this.props.searchModel.setTermText(value);
        this.clearInput();
        this.props.history.push(`/search/${filterName}/${value}`);
      }
    }

    clearInput = () => {
      this.props.searchModel.term = '';
    }

    render() {
      return (
        <div className="search-container">
          <div className='search-form-container'>
            <Input.Search
              placeholder={`Find your favourite ${this.props.searchModel.filterName}`}
              className="search-input"
              value={this.props.searchModel.term}
              onChange={this.onInputChange}
              onSearch={this.onSubmitClick}
              enterButton
            />
            <Radio.Group
                onChange={this.onFilterClick}
                className="radio-group-input"
                value={this.props.searchModel.filterName}
                buttonStyle="solid"
              >
              <Radio.Button value='artist'>Artist</Radio.Button>
              <Radio.Button value='album'>Album</Radio.Button>
              <Radio.Button value='track'>Track</Radio.Button>
            </Radio.Group>
          </div>
        </div>
      );
    }
}

SearchComponent.propTypes = {
  searchModel: PropTypes.object,
  appUI: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object
};

export default SearchComponent;
