export const UPDATE_TOKEN = 'auth/UPDATE_TOKEN';

export function updateToken(token) {
  return { type: UPDATE_TOKEN, token };
}

const initialState = {
  token: ''
};

export function authReducer(state = initialState, action) {
  const { token, type } = action;
  switch (type) {
  case UPDATE_TOKEN:
    return { token };
  default:
    return state;
  }
}

export function withToken(fn) {
  return {
    withToken: fn
  };
}

export default store => next => action => {
  if (!action.withToken) return next(action);

  const state = store.getState();
  next(action.withToken(state.token));
}
