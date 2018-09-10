import React, { Component } from 'react'
import { List, Button, Avatar } from 'antd'
import './Playlist.css'

const data = [
    {
        title: "Tytuł1",
        author: "Author1",
        album: "Chocolate cake dessert sweet roll jujubes",
        time: "03:14"
    },
    {
        title: "Tytuł2",
        author: "Author2",
        album: "Lollipop chupa chups tart bonbon",
        time: "02:30"
    },
    {
        title: "Tytuł3",
        author: "Author3",
        album: "Gummi bears wafer pastry macaroon icing biscuit",
        time: "04:02"
    },
    {
        title: "Tytuł4",
        author: "Author4",
        album: "Jujubes caramels jelly carrot cake",
        time: "03:18"
    }
]

class Playlist extends Component {

    render() {
        return (
            <div className="playlist-container">
                <div className="avatar">
                    <Avatar shape="square" size={64} icon="fire" />
                    <h2>Top Hits</h2>
                </div>
                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Button type="primary" shape="circle" icon="caret-right" size="large" />}
                                    title={item.title}
                                    description={`${item.author}, ${item.album}`}
                                />
                                <div>{item.time}</div>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        )
    }
}

export default Playlist;