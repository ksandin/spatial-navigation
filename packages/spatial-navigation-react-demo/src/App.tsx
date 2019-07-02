import React from 'react';
import './index.css';
import './App.css';
import { Box } from './Box';
import { Row } from './Row';

export const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Row>
          <Box />
          <Box />
          <Box />
          <Box />
        </Row>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};
