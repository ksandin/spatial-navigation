import React from 'react';
import { Spatial } from 'spatial-navigation';
import { SpatialContext } from 'spatial-navigation-react';
import { Scenario } from '../Scenario';
import { ScenarioView } from './ScenarioView';
import { Reset } from 'styled-reset';

export type AppProps = {
  spatial: Spatial;
  scenarios: Scenario[];
};

export const App: React.FC<AppProps> = ({ scenarios, spatial }) => (
  <SpatialContext.Provider value={spatial}>
    <Reset />
    {scenarios.map(scenario => (
      <ScenarioView key={scenario.name} {...scenario} />
    ))}
  </SpatialContext.Provider>
);
