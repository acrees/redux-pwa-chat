import React from 'react'
import * as locals from './chat-input.styl'

export default function ChatInput ({input, onInputChanged, onSendMessage}) {
  var keypress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage(input);
      return false;
    }
  };

  var valueChanged = e => { onInputChanged(e.target.value) };

  return (
    <div className={locals.chatInput}>
      <textarea
        onKeyPress={keypress}
        onChange={valueChanged}
        value={input}>
      </textarea>
    </div>
  );
}
