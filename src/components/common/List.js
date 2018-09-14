import React from 'react';
import PropTypes from 'prop-types';
import { List, Button } from 'antd';

const ListComponent = ({ buttonType, onClick, data, getDescription }) => {
  return (
    <div className='playlist-container'>
        <div>
            {data.map(item => {
                return (
                    <div key={item.id}>
                    <List.Item>
                            <List.Item.Meta
                                avatar={<Button type="primary" shape="circle" icon={buttonType(item.id)} size="large" onClick={() => onClick(item)}/>}
                                title={item.title}
                                description={getDescription(item)}
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
};

ListComponent.propTypes = {
    buttonType: PropTypes.func,
    getDescription: PropTypes.func,
    onClick: PropTypes.func,
    data: PropTypes.array
};

export default ListComponent;
