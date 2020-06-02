import React, { useState, useEffect } from 'react';
import { Canvas, Group, Circle, Ellipse, Line } from 'react-g-canvas';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <Canvas width={1000} height={800}>
      <Group>
        {visible && <Ellipse x={100} y={120} rx={30} ry={20} stroke="red" />}
        <Line x1={200} y1={60} x2={100} y2={120} stroke="black" startArrow endArrow />
      </Group>
    </Canvas>
  );
};

export default App;
