import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { StyleSheet, css } from 'aphrodite';
import assignDeep from 'object-assign-deep';

const defaultStyle = {
  container: {
    position: 'relative',
    width: '100%',
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
};

class Messages extends Component {
  _scrollToBottom() {
    const { chatContainer } = this.refs;
    const scrollHeight = chatContainer.scrollHeight;
    const height = chatContainer.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(chatContainer).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;    
  }
  render() {
    defaultStyle.container.height = this.props.frameHeigth;
    const style = StyleSheet.create(assignDeep({}, defaultStyle, this.props.styles));
    window.setTimeout(() => {
      this._scrollToBottom();
    },400);
    return (
      <div className={css(style.container)} ref="chatContainer">
        <style>{`
          .__CHAT_TEMPLATE_MESSAGES_TRANSITION_ELEMENT-enter {
            transform: translateY(30px);
            max-height: 1px;
            transition: all 0.8s ease-in-out;
          }
          .__CHAT_TEMPLATE_MESSAGES_TRANSITION_ELEMENT-enter.__CHAT_TEMPLATE_MESSAGES_TRANSITION_ELEMENT-enter-active {
            transform: translateY(0px);
            max-height: 150px;
          }
          `}
        </style>
        <ReactCSSTransitionGroup transitionName="__CHAT_TEMPLATE_MESSAGES_TRANSITION_ELEMENT" transitionEnterTimeout={55000} transitionLeave={false}>
          {this.props.messages.map((message, i) => <Message key={i} height={this.props.height} message={message} />)}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Messages.propTypes = {
  height: PropTypes.number,
  frameHeigth: PropTypes.string,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string,
      src: PropTypes.string,
      inbound: PropTypes.bool.isRequired,
      avatar: PropTypes.string,
      backColor: PropTypes.string.isRequired,
      textColor: PropTypes.string,
    })
  ).isRequired,
  styles: PropTypes.object,
};

export default Messages;
