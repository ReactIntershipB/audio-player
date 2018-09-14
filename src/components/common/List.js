const List = ({ props }) => {
  return (
    <div className='playlist-container'>
        <div className='avatar'>
            <Avatar shape='square' size={64} icon='fire' />
            <h2>Top Hits</h2>
        </div>
        <div>
            {this.model.playlist.map(item => {
                return (
                    <div key={item.id}>
                    <List.Item>
                            <List.Item.Meta
                                avatar={<Button type="primary" shape="circle" icon={this.iconChange(item.id)} size="large" onClick={() => this.changeSong(item, this.getSongPosition(item))}/>}
                                title={item.title}
                                description={`${item.author}, ${item.album}`}
                            />
                            <div>{item.time}</div>
                    </List.Item>
                    <hr />
                    </div>
                );
            })}
        </div>
    </div>
  );
}