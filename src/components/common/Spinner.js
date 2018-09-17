import React from 'react';
import { Icon } from 'antd';
import './Common.css';

const Spinner = () => {
    return (
        <div className="spinner-container"><Icon type="loading" theme="outlined" /></div>
    );
};

export default Spinner;
