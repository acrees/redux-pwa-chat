import uuid from 'node-uuid'

export const INPUT_CHANGED = 'input-changed';
export const NEW_MESSAGE = 'new-message';
export const SENT_MESSAGE = 'sent-message';

export function inputChanged(input) {
  return {
    type: INPUT_CHANGED,
    input
  };
}

export function newMessage(message) {
  return {
    type: NEW_MESSAGE,
    message
  };
}

export function sendMessage(content) {
  var message = { id: uuid.v4(), content, sent: false };
  return dispatch => {
    dispatch(inputChanged(''));
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
