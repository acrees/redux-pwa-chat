import { Map, List } from 'immutable'
import { combineReducers } from 'redux'
import { INPUT_CHANGED, NEW_MESSAGE, SENT_MESSAGE } from './actions'

const initialState = Map({
  input: '',
  messages: List()
});

export function root(state = initialState, action) {
  switch(action.type) {
    case INPUT_CHANGED:
      return state.set('input', action.input);
    case NEW_MESSAGE:
      return state
        .set('messages', state.get('messages').push(action.message));
    case SENT_MESSAGE:
      return state
        .set('messages',
          state.get('messages').map(m =>
            m.id === action.id
              ? { id: m.id, content: m.content, sent: true }
              : m));
    default:
      return state;
  }
}
