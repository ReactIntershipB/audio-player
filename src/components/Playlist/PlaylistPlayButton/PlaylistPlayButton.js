import React from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'antd';

export const PlaylistPlayButton = (props) => {
    return (
        <Button
            type='primary'
            shape='circle'
            icon={props.icon}
            size='large'
            onClick={props.onClick}
        />
    );
};

PlaylistPlayButton.propTypes = {
    item: PropTypes.object,
    icon: PropTypes.string,
    onClick: PropTypes.function
};
