import React from 'react'

export default function ChatMessages({messages}) {
  var messageNodes = messages.map(({id, content, sent}) => (
    <li key={id}>
      <pre className={sent ? 'sent' : 'pending'}>{content}</pre>
    </li>
  ));

  return (
    <ul>{messageNodes}</ul>
  );
}
