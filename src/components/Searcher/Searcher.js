import React, { Component } from 'react';
import { Input, Dropdown, Icon, Menu, Button } from 'antd';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

import './Searcher.css';

@observer
export default class Searcher extends Component {
    constructor() {
        super();
        this.ui = new SearcherUI();
        this.model = new SearcherModel();
    }

    get dropdownMenu () {
        return (
            <Menu
                className='dropdown-menu'
                value={this.ui.filterName}
                onClick={this.onFilterClick}
            >
                <Menu.Item key="0" value='1st filter'>
                    1st filter
                </Menu.Item>
                <Menu.Item key="1" value='2nd filter'>
                    2nd filter
                </Menu.Item>
                <Menu.Item key="2" value='3rd filter'>
                    3rd filter
                </Menu.Item>
            </Menu>
        );
    };

    get addonSearchIcon () {
        return (
            <Icon type="search" />
        );
    };

    onInputChange = (e) => {
        const value = e.target.value;
        this.ui.setValue(value);
    }

    onFilterClick = (e) => {
        const value = e.item.props.value;
        this.ui.setFilterName(value);
    }

    onSubmitClick = () => {
        const { value } = this.ui;

        if (value !== '') {
            console.log('input value: ' + value);
            this.model.passValue(value);
            this.ui.resetValue();
        }
    }

    render () {
        return (
        <div className='searcher-wrapper'>
            <Input
                placeholder="Find some music..."
                className="searcher-input"
                onChange={this.onInputChange}
                value={this.ui.value}
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
                onClick={this.onSubmitClick}
            >Submit</Button>
        </div>
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

class SearcherModel {
    passValue = (value) => {
        console.log('Value in model: ' + value);
    }
}
