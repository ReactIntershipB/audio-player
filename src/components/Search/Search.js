import React, { Component } from 'react';
import { Icon, Menu, Input, Radio } from 'antd';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import './Search.css';

const RadioGroup = Radio.Group;

@inject('searchModel', 'appUI')
@observer
class SearchComponent extends Component {
    componentDidMount() {
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

    get addonSearchIcon() {
        return (
            <Icon type="search" />
        );
    };

    fetchData = () => {
      const { term, type } = this.props.match.params;
      if (term && type) {
        this.props.searchModel.find(term, type);
      }
    }

    getFilterName = (filterName) => {
      return filterName.charAt(0).toUpperCase() + filterName.slice(1);
    }

    onInputChange = e => {
      this.props.searchModel.inputChange(e.target.value);
      this.props.appUI.changeButtonStatus(e.target.value);
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
        this.props.appUI.changeButtonStatus(value);
        this.props.history.push(`/search/${filterName}/${value}`);
      }
    }

    clearInput = () => {
      this.props.searchModel.term = '';
    }

    render() {
      const { filterName } = this.props.searchModel;
      return (
        <div className="search-container">
            <div className='search-form-container'>
            <Input.Search
              placeholder="input search text"
              onSearch={value => this.onSubmitClick(value)}
              enterButton
              />
            <RadioGroup onChange={this.onFilterClick} value={filterName}>
              <Radio value={'artist'}>Artist</Radio>
              <Radio value={'album'}>Album</Radio>
              <Radio value={'track'}>Track</Radio>
            </RadioGroup>
            {/* <Dropdown
              className='dropdown'
              overlay={this.dropdownMenu}
            >
              <Button className="ant-dropdown-link">
                {this.getFilterName(this.props.searchModel.filterName)}
                <Icon type="down" />
              </Button>
            </Dropdown> */}
            {/* <Button
              type="primary"
              disabled={this.props.appUI.isButtonDisabled}
              onClick={this.onSubmitClick}
            >
              Submit
            </Button> */}
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
