import React from 'react';
import './Common.css';

export const NoResult = () => {
    return (
      <div className="noresult-container">
         <i className="far fa-sad-tear"></i>
         <h3>Couldnt find any matching results.</h3>
      </div>
    );
};
