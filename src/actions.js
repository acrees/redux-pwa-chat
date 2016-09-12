import uuid from 'node-uuid'

export const NEW_MESSAGE = 'new-message';
export const SENT_MESSAGE = 'sent-message';

export const NAME_INPUT_CHANGED = 'name-input-changed';
export const SHOW_CHAT_PAGE = 'show-chat-page';

export const CHAT_INPUT_CHANGED = 'chat-input-changed';

export function newMessage(message) {
  return {
    type: NEW_MESSAGE,
    message
  };
}

export function sendMessage(content) {
  var message = { id: uuid.v4(), content, sent: false };
  return dispatch => {
    dispatch(chatInputChanged(''));
    dispatch(newMessage(message));
    window.socket.emit('send-message', message);
  }
}

export function sentMessage(id) {
  return {
    type: SENT_MESSAGE,
    id
  };
}

export function nameInputChanged(name) {
  return {
    type: NAME_INPUT_CHANGED,
    name
  };
}

export function showChatPage() {
  return {
    type: SHOW_CHAT_PAGE
  };
}

export function chatInputChanged(input) {
  return {
    type: CHAT_INPUT_CHANGED,
    input
  };
}
