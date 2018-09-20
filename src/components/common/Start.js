import React from 'react';
import { Link } from 'react-router-dom';
import './Common.css';

export const Start = () => {
    return (
        <div className="start-container">
            <h3>Popular</h3>
            <div className="start-cards-container">
              <Link to={'/search/album/kamikaze'}>
                <div className="start-card-container">
                    <div className="start-card-content" style={{ backgroundImage: 'url(https://e-cdns-images.dzcdn.net/images/cover/bf74fc764097630ba58782ae79cfbee6/500x500-000000-80-0-0.jpg)' }}>
                    </div>
                    <p className="start-card-title">Eminem - Kamikaze</p>
                </div>
              </Link>
              <Link to={'/search/tracks/despacio'}>
                <div className="start-card-container">
                    <div className="start-card-content" style={{ backgroundImage: 'url(https://e-cdns-images.dzcdn.net/images/cover/b566a3546828f0d481e8a8ab79546b08/500x500-000000-80-0-0.jpg)' }}>
                    </div>
                    <p className="start-card-title">Yandel - Despacio</p>
                </div>
              </Link>
              <Link to={'/search/artist/imagine dragons'}>
                <div className="start-card-container">
                    <div className="start-card-content" style={{ backgroundImage: 'url(https://e-cdns-images.dzcdn.net/images/cover/27c1cc0cab1bbe6db36da433c6098be0/500x500-000000-80-0-0.jpg)' }}>
                    </div>
                    <p className="start-card-title">Imagine Dragons</p>
                </div>
              </Link>
              <Link to={'/search/artist/shakira'}>
                <div className="start-card-container">
                    <div className="start-card-content" style={{ backgroundImage: 'url(https://e-cdns-images.dzcdn.net/images/cover/975abab73605c4526d1a050940ecf7cf/500x500-000000-80-0-0.jpg)' }}>
                    </div>
                    <p className="start-card-title">Shakira</p>
                </div>
              </Link>
            </div>
        </div>
    );
};
