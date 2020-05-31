import React, { useState } from 'react';
// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/no-extraneous-dependencies
import { Canvas, Group, Circle, Ellipse, Line } from 'react-g-canvas';
import { Motion, spring } from 'react-motion';

const App: React.FC = () => {
  const [style, setStyle] = useState({ r: 30 });
  return (
    <Canvas width={1000} height={800}>
      <Group>
        <Motion defaultStyle={{ r: 30 }} style={style}>
          {({ r }) => (
            <Circle
              x={100}
              y={60}
              r={r}
              stroke="black"
              fill="blue"
              onMouseenter={() => {
                console.log('onmouseenter');
                setStyle({ r: spring(40) });
              }}
              onMouseleave={() => {
                console.log('onmouseleave');
                setStyle({ r: spring(30) });
              }}
            />
          )}
        </Motion>
        <Ellipse x={100} y={120} rx={30} ry={20} stroke="red" />
        <Line x1={200} y1={60} x2={100} y2={120} stroke="black" startArrow endArrow />
      </Group>
    </Canvas>
  );
};

export default App;
