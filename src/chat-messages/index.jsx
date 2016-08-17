import React from 'react'

export default function ChatMessages({messages}) {
  var messageNodes = messages.map(({id, content}) => (
    <li key={id}>
      <pre>{content}</pre>
    </li>
  ));

  return (
    <ul>{messageNodes}</ul>
  );
}
