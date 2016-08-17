import React from 'react'
import { connect } from 'react-redux'
import { inputChanged, sendMessage } from '../actions'
import ChatInput from '../chat-input'
import ChatMessages from '../chat-messages'
import * as locals from './app.styl'

function mapStateToProps(state) {
  return {
    input: state.get('input'),
    messages: state.get('messages')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onInputChanged: (input) => dispatch(inputChanged(input)),
    onSendMessage: (content) => dispatch(sendMessage(content))
  };
}

class App extends React.Component {
  render() {
    return (
      <div className={locals.app}>
        <h1>Hello, React!</h1>
        <ChatMessages messages={this.props.messages} />
        <ChatInput
          input={this.props.input}
          onInputChanged={this.props.onInputChanged}
          onSendMessage={this.props.onSendMessage} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
