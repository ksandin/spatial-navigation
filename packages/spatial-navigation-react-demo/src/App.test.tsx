import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { Providers } from './Providers';
import { Spatial } from 'spatial-navigation';

it('renders without crashing', () => {
  const spatial = new Spatial();
  const div = document.createElement('div');
  ReactDOM.render(
    <Providers spatial={spatial}>
      <App />
    </Providers>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
