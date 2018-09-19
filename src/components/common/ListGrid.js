import React from 'react';
import PropTypes from 'prop-types';
import { PlayIcon } from './PlayIcon';
import './Common.css';

export const ListGrid = ({ data }) => {
    return (
        <div className="playlist-container">
          <div className="list-grid-container">
            {data.map(item => {
              return (
                 <div key={item.album.id} className="list-grid-card-container">
                     <div className="list-grid-card-content" style={{ backgroundImage: 'url(' + item.album.cover_big + ')' }}>
                         <PlayIcon songId={item.id}/>
                     </div>
                     <h3 className="list-grid-card-title">{item.album.title}</h3>
                 </div>
              );
            })}
          </div>
        </div>
    );
};

ListGrid.propTypes = {
  data: PropTypes.array
};
