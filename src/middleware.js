export const cachingMiddleware = store => next => action => {
  let result = next(action);
  let state = store.getState();
  window.localStorage.setItem('state', JSON.stringify(state.toJS()));
  return result;
}
