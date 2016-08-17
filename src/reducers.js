import { Map, List } from 'immutable'
import { combineReducers } from 'redux'
import { INPUT_CHANGED, SEND_MESSAGE } from './actions'

const initialState = Map({
  input: '',
  messages: List()
});

export function root(state = initialState, action) {
  switch(action.type) {
    case INPUT_CHANGED:
      return state.set('input', action.input);
    case SEND_MESSAGE:
      return state
        .set('messages', state.get('messages').push(action.message))
        .set('input', '');
    default:
      return state;
  }
}
