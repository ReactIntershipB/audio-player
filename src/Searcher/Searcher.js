import React, { Component } from 'react';
import { Input, Dropdown, Icon, Menu, Button } from 'antd';

import './Searcher.css';

export default class Searcher extends Component {

    state = {
        inputValue: '',
        filterName: '1st filter'
    }

    get dropdownMenu() {
        return (
            <Menu 
                className='dropdown-menu' 
                value={this.state.filterName}
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
        )
    };

    get addonSearchIcon() {
        return (
            <Icon type="search" />
        )
    };

    onInputChange = e => {
        console.log(e.target.value);
        this.setState({
            inputValue: e.target.value
        })
    }

    onFilterClick = (e) => {
        console.log(e.item.props.value);
        this.setState({
            filterName: e.item.props.value
        })
    }

    onSubmitClick = () => {
        if (this.state.inputValue !== '') {
            console.log(this.state.inputValue);
            this.setState({
                inputValue: ''
            })
        }
    }

    render() {
        return (
        <div className='searcher-wrapper'>
            <Input 
                placeholder="Find some music..."
                className="searcher-input"
                onChange={this.onInputChange}
                value={this.state.inputValue}
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
        )
    }
}
