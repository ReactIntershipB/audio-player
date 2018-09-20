import React from 'react';
import { Spin } from 'antd';

export const Spinner = () => {
    return (
        <div className="spinner-container">
           <Spin size="large" />
        </div>
    );
};
