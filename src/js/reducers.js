import { Map, List } from 'immutable';
import { combineReducers } from 'redux';

const initialState = Map();

export function root(state = initialState, action) {
  return state;
}
