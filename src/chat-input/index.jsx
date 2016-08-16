import React from 'react'
import * as locals from './chat-input.styl'

function keypress(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    console.log('Submit!');
    return false;
  }
}

export default function ChatInput () {
  return (
    <div className={locals.chatInput}>
      <textarea onKeyPress={keypress}></textarea>
    </div>
  );
}
