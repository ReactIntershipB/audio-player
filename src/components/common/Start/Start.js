import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import './Common.css';

export const Start = () => {
    return (
        <div className="playlist-container">
            <div className="list-column-container">
                <div>
                    <div className="list-column-item-content">
                        <Link to={'/album/72000342'}>
                            <Avatar size={60} shape={'square'} src={'https://e-cdns-images.dzcdn.net/images/cover/bf74fc764097630ba58782ae79cfbee6/500x500-000000-80-0-0.jpg'} />
                            <div className="list-column-item-content-heading">
                                <p>Eminem - Kamikaze</p>
                            </div>
                        </Link>
                    </div>
                    <hr />
                </div>
            </div>
            <div className="list-column-container">
                <div>
                    <div className="list-column-item-content">
                        <Link to={'/album/57148262'}>
                            <Avatar size={60} shape={'square'} src={'https://e-cdns-images.dzcdn.net/images/cover/27c1cc0cab1bbe6db36da433c6098be0/56x56-000000-80-0-0.jpg'} />
                            <div className="list-column-item-content-heading">
                                <p>Imagine Dragons - Evolve</p>
                            </div>
                        </Link>
                    </div>
                    <hr />
                </div>
            </div>
            <div className="list-column-container">
                <div>
                    <div className="list-column-item-content">
                        <Link to={'/album/42014431'}>
                            <Avatar size={60} shape={'square'} src={'https://e-cdns-images.dzcdn.net/images/cover/975abab73605c4526d1a050940ecf7cf/56x56-000000-80-0-0.jpg'} />
                            <div className="list-column-item-content-heading">
                                <p>Shakira - El Dorado</p>
                            </div>
                        </Link>
                    </div>
                    <hr />
                </div>
            </div>
            <div className="list-column-container">
                <div>
                    <div className="list-column-item-content">
                        <Link to={'/album/8609508'}>
                            <Avatar size={60} shape={'square'} src={'https://e-cdns-images.dzcdn.net/images/cover/2d6db71be43a0d86542293d0f0d1919b/56x56-000000-80-0-0.jpg'} />
                            <div className="list-column-item-content-heading">
                                <p>2Pac - Greatest Hits</p>
                            </div>
                        </Link>
                    </div>
                    <hr />
                </div>
            </div>
            <div className="list-column-container">
                <div>
                    <div className="list-column-item-content">
                        <Link to={'/album/1649488'}>
                            <Avatar size={60} shape={'square'} src={'https://e-cdns-images.dzcdn.net/images/cover/01cbc8484f34e2f33260ca05d060feda/56x56-000000-80-0-0.jpg'} />
                            <div className="list-column-item-content-heading">
                                <p>Rihanna - Good Girl Gone Bad: Reloaded</p>
                            </div>
                        </Link>
                    </div>
                    <hr />
                </div>
            </div>
            <div className="list-column-container">
                <div>
                    <div className="list-column-item-content">
                        <Link to={'/album/6854302'}>
                            <Avatar size={60} shape={'square'} src={'https://cdns-images.dzcdn.net/images/cover/c20b4437ea351e2cf8c1ee98faa84c9c/56x56-000000-80-0-0.jpg'} />
                            <div className="list-column-item-content-heading">
                                <p>Marek Grechuta - Zlote Przeboje 1</p>
                            </div>
                        </Link>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    );
};
