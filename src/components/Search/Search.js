import React, { Component } from 'react';
import { Input, Dropdown, Icon, Menu, Button } from 'antd';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { Redirect } from 'react-router-dom';

import './Search.css';
import { SearchModel } from '../../models/SearchModel/SearchModel';

@observer
export default class Searcher extends Component {
    constructor() {
        super();

        this.ui = new SearchUI();
        this.model = new SearchModel();
    }

    get dropdownMenu () {
        return (
            <Menu
                className='dropdown-menu'
                value={this.ui.filterName}
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

    get addonSearchIcon () {
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
        if (this.model.term !== '') {
            this.model.findSongs(this.model.term, this.model.filterName);
            this.model.term = '';
            this.ui.updateRedirect();
        }
    }

    get direction() {
        return this.model.filterName === 'track' ? '/playlist' : '/search';
    }

    render () {
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

    updateRedirect() {
        this.redirect = true;
        setTimeout(() => {
            this.redirect = false;
        }, 0);
    }
}
