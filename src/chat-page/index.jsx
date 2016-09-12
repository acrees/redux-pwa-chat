import React from 'react'
import { connect } from 'react-redux'
import { chatInputChanged, sendMessage } from '../actions'
import ChatInput from '../chat-input'
import ChatMessages from '../chat-messages'

function mapStateToProps(state) {
  return {
    input: state.get('input'),
    messages: state.get('messages')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onInputChanged: (input) => dispatch(chatInputChanged(input)),
    onSendMessage: (content) => dispatch(sendMessage(content))
  };
}

class ChatPage extends React.Component {
  render() {
    return (
      <div>
        <ChatMessages messages={this.props.messages} />
        <ChatInput
          input={this.props.input}
          onInputChanged={this.props.onInputChanged}
          onSendMessage={this.props.onSendMessage} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
