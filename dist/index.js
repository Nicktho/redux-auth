'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.updateToken = updateToken;
exports.authReducer = authReducer;
var UPDATE_TOKEN = 'auth/UPDATE_TOKEN';

exports.UPDATE_TOKEN = UPDATE_TOKEN;

function updateToken(token) {
  return { type: UPDATE_TOKEN, token: token };
}

var initialState = {
  token: ''
};

function authReducer(state, action) {
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

exports['default'] = function (store) {
  return function (next) {
    return function (action) {
      if (!action.withToken) return next(action);

      var state = store.getState();
      next(action.withToken(state.token));
    };
  };
};