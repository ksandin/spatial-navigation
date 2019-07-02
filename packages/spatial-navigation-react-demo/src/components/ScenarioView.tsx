import * as React from 'react';
import styled from 'styled-components/macro';
import { Scenario } from '../Scenario';

export const ScenarioView: React.FC<Scenario> = ({
  name,
  component: Component
}) => (
  <Container>
    <Name>{name}</Name>
    <Component />
  </Container>
);

const Container = styled.div`
  padding: 50px;
  background: tomato;
  & + & {
    margin-top: 50px;
  }
`;

const Name = styled.h1`
  color: white;
  font-family: Arial, serif;
  font-size: 18px;
  margin-bottom: 1.5em;
`;
