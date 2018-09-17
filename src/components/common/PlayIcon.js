import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

@inject('appUI')
@observer
export class PlayIcon extends React.Component {
    get iconType () {
        return this.props.appUI.isPaused ? 'caret-right' : 'pause';
    }

    render () {
        return (
            <Button shape='circle'
                size={'large'}
                icon={this.iconType}
                onClick={() => this.props.appUI.togglePlay()} />
        );
    }
}

PlayIcon.propTypes = {
    appUI: PropTypes.object
};
