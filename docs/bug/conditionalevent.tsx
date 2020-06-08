import React, { useState, useEffect } from 'react';
import { Canvas, Group, Ellipse, Line } from 'react-g-canvas';

const App: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [color, setColor] = useState('red');
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const onClick = () => {
    setColor('blue');
  };

  return (
    <Canvas width={600} height={400}>
      <Group>
        <Ellipse
          x={100}
          y={120}
          rx={30}
          ry={20}
          stroke="red"
          fill={color}
          onClick={visible && onClick}
        />
        {visible && <Line x1={200} y1={60} x2={100} y2={120} stroke="black" startArrow endArrow />}
      </Group>
    </Canvas>
  );
};

export default App;
