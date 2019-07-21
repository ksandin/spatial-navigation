import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { SpatialGroup } from 'spatial-navigation';
import { inputEffect } from './effects/inputEffect';
import { App } from './components/App';
import { First } from './components/First';

const spatial = new SpatialGroup();
inputEffect(spatial, window);
ReactDOM.render(
  <App
    spatial={spatial}
    scenarios={[
      { name: 'First', component: First },
      { name: 'Second', component: First },
      { name: 'Third', component: First }
    ]}
  />,
  document.getElementById('root')
);

(window as any).spatial = spatial;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
