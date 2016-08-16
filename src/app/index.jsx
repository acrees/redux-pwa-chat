import React from 'react'
import ChatInput from '../chat-input'
import * as locals from './app.styl'

export default class App extends React.Component {
  render() {
    return (
      <div className={locals.app}>
        <h1>Hello, React!</h1>
        <p>If you're seeing this, it means your scaffolded application is set up correctly and ready to go! Have fun :-)</p>
        <ChatInput />
      </div>
    )
  }
}
