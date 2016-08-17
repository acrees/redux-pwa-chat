import uuid from 'node-uuid'

export const INPUT_CHANGED = 'input-changed';
export const SEND_MESSAGE = 'send-message';

export function inputChanged(input) {
  return {
    type: INPUT_CHANGED,
    input
  };
}

export function sendMessage(content) {
  return {
    type: SEND_MESSAGE,
    message: { id: uuid.v4(), content }
  };
}
