import React from 'react'

export default function ChatMessages({messages}) {
  var messageNodes = messages.map(({id, content, sent, author}) => (
    <li key={id}>
      <pre className={sent ? 'sent' : 'pending'}>{(author || 'self') + ': ' + content}</pre>
    </li>
  ));

  return (
    <ul>{messageNodes}</ul>
  );
}
