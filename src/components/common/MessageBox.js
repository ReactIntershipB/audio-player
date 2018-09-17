import ReactDOM from 'react-dom';

export const MessageBox = (props) => {
    const messageBox = document.getElementById('message-box');

    return ReactDOM.createPortal(
        props.children,
        messageBox
      );
};
