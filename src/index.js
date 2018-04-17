import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { pipe, map } from 'callbag-basics';
import delay from 'callbag-delay';
import mapPromise from 'callbag-map-promise';
import createCallbagMiddleware, { ofType } from './callbagMiddleware';

const todos = (state = ['Callbags'], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat(action.text);
    default:
      return state;
  }
}

const delayEpic = (action$, store) => pipe(
  action$,
  ofType('ASYNC_TODO'),
  delay(1000),
  map(action => ({
    type: 'ADD_TODO',
    text: action.text + ' (delayed)',
  })),
);

const ajaxEpic = (action$, store) => pipe(
  action$,
  ofType('AJAX_TODO'),
  mapPromise(action =>
    fetch(`//jsonplaceholder.typicode.com/posts/${(1+Math.random()*50)>>>0}`)
    .then(res => res.json())
  ),
  map(data => ({
    type: 'ADD_TODO',
    text: data.title,
  })),
)

const store = createStore(
  todos,
  applyMiddleware(
    createCallbagMiddleware(delayEpic, ajaxEpic),
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
