import React from 'react';
import { SpatialGroup } from 'spatial-navigation';
import { SpatialGroupContext } from 'spatial-navigation-react';
import { Scenario } from '../Scenario';
import { ScenarioView } from './ScenarioView';
import { Reset } from 'styled-reset';

export type AppProps = {
  spatial: SpatialGroup;
  scenarios: Scenario[];
};

export const App: React.FC<AppProps> = ({ scenarios, spatial }) => (
  <SpatialGroupContext.Provider value={spatial}>
    <Reset />
    {scenarios.map(scenario => (
      <ScenarioView key={scenario.name} {...scenario} />
    ))}
  </SpatialGroupContext.Provider>
);
