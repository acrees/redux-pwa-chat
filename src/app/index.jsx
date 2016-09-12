import React from 'react'
import { connect } from 'react-redux'
import * as locals from './app.styl'
import WelcomePage from '../welcome-page'
import ChatPage from '../chat-page'

function mapStateToProps(state) {
  return {
    view: state.get('view')
  };
}

class App extends React.Component {
  render() {
    return <div className={locals.app}>{this.currentView()}</div>;
  }

  currentView() {
    switch(this.props.view) {
      case 'chat':
        return <ChatPage />;
      case 'welcome':
      default:
        return <WelcomePage />;
    }
  }
}

export default connect(mapStateToProps)(App);
