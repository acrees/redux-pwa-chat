import React from 'react'
import { connect } from 'react-redux'
import { nameInputChanged, showChatPage } from '../actions'

function mapStateToProps(state) {
  return {
    name: state.get('name'),
    page: state.get('page')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onInputChanged: (e) => dispatch(nameInputChanged(e.target.value)),
    onNext: () => dispatch(showChatPage())
  };
}

class WelcomePage extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello there!</h1>
        <input type="text" value={this.props.name} onChange={this.props.onInputChanged} />
        <button onClick={this.props.onNext}>Start</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage);
