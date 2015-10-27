'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.updateToken = updateToken;
exports.tokenReducer = tokenReducer;
exports.withToken = withToken;
var UPDATE_TOKEN = 'auth/UPDATE_TOKEN';

exports.UPDATE_TOKEN = UPDATE_TOKEN;

function updateToken(token) {
  return { type: UPDATE_TOKEN, token: token };
}

var initialState = {
  token: ''
};

function tokenReducer(state, action) {
  if (state === undefined) state = initialState;
  var token = action.token;
  var type = action.type;

  switch (type) {
    case UPDATE_TOKEN:
      return { token: token };
    default:
      return state;
  }
}

function withToken(fn) {
  return {
    withToken: fn
  };
}

exports['default'] = function (store) {
  return function (next) {
    return function (action) {
      if (!action.withToken) return next(action);

      var state = store.getState();
      next(action.withToken(state.token));
    };
  };
};