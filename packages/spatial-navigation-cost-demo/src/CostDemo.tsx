import * as React from 'react';
import styled from 'styled-components/macro';
import {
  Spatial,
  Rect,
  getTravelCost,
  getDirectionAngle,
  getAngleDelta
} from 'spatial-navigation';
import { SpatialContext } from 'spatial-navigation-react';
import { Reset } from 'styled-reset';

export type CostDemoProps = {
  spatial: Spatial;
};

export const CostDemo: React.FC<CostDemoProps> = ({ spatial }) => {
  const containerSize = new Rect(0, 0, 500, 500);
  const rect1 = new Rect(225, 225, 50, 50);
  const [rect2, setRect2] = React.useState(new Rect(10, 10, 25, 25));
  const setRect2Position = (e: React.MouseEvent) =>
    setRect2(
      rect2.position(e.clientX - rect2.width / 2, e.clientY - rect2.height / 2)
    );

  const line = rect1.line(rect2);
  const [lineStart, lineEnd] = line;
  const distance = lineStart.distance(lineEnd);
  const direction = lineStart.direction(lineEnd);
  const directionAngle = getDirectionAngle(direction);
  const lineAngle = lineStart.angle(lineEnd);
  const angleDelta = getAngleDelta(directionAngle, lineAngle);
  const cost = getTravelCost(line, directionAngle);

  return (
    <SpatialContext.Provider value={spatial}>
      <Reset />
      <Container>
        <Body
          width={containerSize.width}
          height={containerSize.height}
          onClick={setRect2Position}
        >
          <rect {...rect1} fill="skyblue" />
          <rect {...rect2} fill="green" />
          <Line
            x1={lineStart.x}
            y1={lineStart.y}
            x2={lineEnd.x}
            y2={lineEnd.y}
          />
        </Body>
        <Info>
          Direction angle: {directionAngle.toFixed(2)}r<br />
          Line angle: {lineAngle.toFixed(2)}r<br />
          Angle delta: {angleDelta.toFixed(2)}r<br />
          Distance: {distance.toFixed(2)}px
          <br />
          Cost: {cost.toFixed(2)}
        </Info>
      </Container>
    </SpatialContext.Provider>
  );
};

const Info = styled.div`
  bottom: 25px;
  left: 25px;
  pointer-events: none;
  position: absolute;
  color: white;
`;

const Line = styled.line`
  stroke: white;
  stroke-width: 2;
`;

const Body = styled.svg`
  background: tomato;
  position: relative;
`;

const Container = styled.div`
  position: relative;
  display: inline-block;
`;
