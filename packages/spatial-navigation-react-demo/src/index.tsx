import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Spatial } from 'spatial-navigation';
import { inputBehavior } from './inputBehavior';
import { Providers } from './Providers';
import { App } from './App';

const spatial = new Spatial();
inputBehavior(spatial, window);
ReactDOM.render(
  <Providers spatial={spatial}>
    <App />
  </Providers>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
