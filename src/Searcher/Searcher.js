import React, { Component } from 'react';
import { Input, Dropdown, Icon, Menu, Button } from 'antd';

import './Searcher.css';

export default class Searcher extends Component {
    
    get dropdownMenu() {
        return (
            <Menu className='dropdown-menu'>
                <Menu.Item key="0">
                    <a href="#">1st filter</a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a href="#">2nd filter</a>
                </Menu.Item>
                <Menu.Item key="2">
                    <a href="#">3rd filter</a>
                </Menu.Item>
            </Menu>
        )
    };

    get addonSearchIcon() {
        return (
            <Icon type="search" />
        )
    };

    render() {
        return (
        <div className='searcher-wrapper'>
            <Input 
                placeholder="Find some music..."
                className="searcher-input"
                onChange={e => console.log(e.target.value)}
                addonAfter={this.addonSearchIcon} 
            />
            <Dropdown className='dropdown' overlay={this.dropdownMenu} >
                <a className="ant-dropdown-link" href="#">
                    <Icon type="down" />
                </a>
            </Dropdown>
            <Button type="primary">Submit</Button>
        </div>
        )
    }
}
