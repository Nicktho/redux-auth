# redux-auth
A simple redux middleware for JWT based authorization

Works with any async store middleware.

## How to use:

Add the `auth` middleware where you create your store

```
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import auth from 'redux-auth';
import reducer from '../reducers';

const applyStore = applyMiddleware(thunk, auth)(createStore);

export default function configureStore(state) {
  const store = applyStore(reducer, state);

  return store;
}
```

Add `tokenReducer` to your reducers

```
import { combineReducers } from 'redux';
import { tokenReducer } from 'redux-auth';

export default combineReducers({
  token: tokenReducer
  // Other reducers
});
```

Use the `updateToken()` action creator to update your client's token where you like

```
import { updateToken } from 'redux-auth';

export function login(email, password) {
  return dispatch => {
    loginApi.post({ email, password })
    .then(res => {
      dispatch(updateToken(res.token));
    });
  };
}
```

Use the `withAuth()` helper in any action creator to get access to your token

```
import { withToken } from 'redux-auth';

export function addTodo(todo) {
  return withToken(token => dispatch => {
    todoApi.post({ todo }, token)
    .then(res => {
      dispatch(todoSuccess(res.todo))
    });
  });
}
```
