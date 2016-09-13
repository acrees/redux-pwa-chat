import { Map, List } from 'immutable'
import { combineReducers } from 'redux'
import { SET_CODE, NEW_MESSAGE, SENT_MESSAGE, NAME_INPUT_CHANGED, SHOW_CHAT_PAGE, CHAT_INPUT_CHANGED } from './actions'

const initialState = Map({
  name: '',
  input: '',
  messages: List(),
  view: 'welcome',
  authorCode: ''
});

export function root(state = initialState, action) {
  switch(action.type) {
    case SET_CODE:
      return state.set('authorCode', action.code);
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
    case NAME_INPUT_CHANGED:
      return state.set('name', action.name);
    case SHOW_CHAT_PAGE:
      return state.set('view', 'chat');
    case CHAT_INPUT_CHANGED:
      return state.set('input', action.input);
    default:
      return state;
  }
}
